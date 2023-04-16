import { PO_DATA } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { WebsocketService } from 'src/app/websocket.service';
import { loadrecipe } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-el-recipe-setup',
  templateUrl: './el-recipe-setup.component.html',
  styleUrls: ['./el-recipe-setup.component.scss'],
})
export class ElRecipeSetupComponent implements OnInit {
  recipeAlready: any;
  machineData: any;
  machineId!: number;

  destroyed$ = new Subject();
  isLoading: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string | null = null;
  loadrecipes: loadrecipe[] = [];
  loadrecipesOthers: loadrecipe[] = [];
  recipeParameters: any;
  isRework: string | null = null;
  isBtnDisabled: boolean = false;
  is_same: boolean = false;
  isModify: boolean = false;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private helperService: HelperService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machineData = this.appStorage.get('MACHINE')!;
    this.machineId = this.machineData[0]?.id;

    this.getLoadRecipe();
    this.wsService
      .connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response: any) => {
          if (response.success && response.op === 'LOAD_PRODUCT_RECIPE') {
            this.isLoading = false;
            this.isSuccess = true;
            this.errorMessage = null;
            this.loadrecipes = response.nodes.filter(
              (ele: loadrecipe) => ele.category === 'main'
            );

            this.loadrecipesOthers = response.nodes.filter(
              (ele: loadrecipe) => ele.category === 'other'
            );

            this.appStorage.set('RECIPE_LOADED_FOR_PO', response.nodes);
            this.isSuccess = true;
          } else if (!response.success) {
            this.isLoading = false;
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          console.info(error);
        },
      });
  }

  getLoadRecipe() {
    this.recipeAlready = this.appStorage.get('RECIPE_LOADED_FOR_PO');
    this.sharedService.getLoadRecipe(this.machineId).subscribe((res: any) => {
      const data = res.data.map((key: any) => ({
        ...key,
        set_recipe: key.value,
        isMinus: false,
        isPlus: false,
      }));

      this.recipeParameters = data.filter(
        (ele: loadrecipe) => ele.category === 'internal'
      );

      this.loadrecipes = data.filter(
        (ele: loadrecipe) => ele.category === 'main'
      );

      this.loadrecipesOthers = data.filter(
        (ele: loadrecipe) => ele.category === 'other'
      );

      if (!this.recipeAlready && this.recipeAlready == null) {
        this.loadRecipe();
      } else {
        this.isLoading = false;
        if (this.recipeAlready && this.recipeAlready?.length > 0) {
          this.isSuccess = true;
        }
        this.recipeAlready = this.recipeAlready.map((ele: any) => {
          ele.isPlus = false;
          ele.isMinus = false;

          if (ele.min_value < ele.set_recipe < ele.max_value) {
            if (ele.set_recipe < ele.max_value) {
              ele.isPlus = true;
            }
            if (ele.min_value < ele.set_recipe) {
              ele.isMinus = true;
            }
          }
          return ele;
        });
        this.loadrecipes = this.recipeAlready.filter(
          (ele: loadrecipe) => ele.category === 'main'
        );
        this.loadrecipesOthers = this.recipeAlready.filter(
          (ele: loadrecipe) => ele.category === 'other'
        );
        if (this.isRework == 'true') {
          this.isBtnDisabled = true;
        }
      }

      if (this.recipeAlready && this.recipeAlready?.length > 0) {
        this.is_same = this.recipeAlready.every((ele: loadrecipe) => {
          return ele.value == ele.loaded_value;
        });
      }
    });
  }

  loadRecipe() {
    const time = this.helperService.getTimeString();

    if (this.isModify) {
      this.recipeParameters = this.recipeParameters.map((ele: any) => {
        if (ele.display_name == 'OTP_PROD_RCP_ID') {
          ele.value = ele.value.concat(time);
        }
        return ele;
      });
    }

    const setRecipeParameters = this.loadrecipes.map((key: any) => {
      key.value = key.set_recipe;
      return key;
    });
    const setRecipeParametersOthers = this.loadrecipesOthers.map((key: any) => {
      key.value = key.set_recipe;
      return key;
    });

    const nodes = [
      ...this.recipeParameters,
      ...setRecipeParameters,
      ...setRecipeParametersOthers,
    ];

    this.appStorage.set('RECIPE_LOADED_FOR_PO', nodes);
    this.isLoading = true;

    this.wsService.send({
      op: 'LOAD_PRODUCT_RECIPE',
      nodes: nodes,
      prefix: this.machineData[0].node_prefix,
    });

    this.isModify = false;
  }

  minus(index: number, tagType: string) {
    this.isModify = true;

    if (tagType === 'main') {
      this.loadrecipes = this.loadrecipes.map((ele: any, i: number) => {
        ele.isPlus = false;
        ele.isMinus = false;
        if (index == i && ele.min_value < ele.set_recipe < ele.max_value) {
          ele.set_recipe--;
        }
        if (ele.min_value < ele.set_recipe < ele.max_value) {
          if (ele.set_recipe < ele.max_value) {
            ele.isPlus = true;
          }
          if (ele.min_value < ele.set_recipe) {
            ele.isMinus = true;
          }
        }
        return ele;
      });
    } else {
      this.loadrecipes = this.loadrecipes.map((ele: any, i: number) => {
        ele.isPlus = false;
        ele.isMinus = false;
        if (index == i && ele.min_value < ele.set_recipe < ele.max_value) {
          ele.set_recipe--;
        }
        if (ele.min_value < ele.set_recipe < ele.max_value) {
          if (ele.set_recipe < ele.max_value) {
            ele.isPlus = true;
          }
          if (ele.min_value < ele.set_recipe) {
            ele.isMinus = true;
          }
        }
        return ele;
      });
    }
  }

  plus(index: number, tagType: string) {
    this.isModify = true;

    if (tagType === 'main') {
      this.loadrecipes = this.loadrecipes.map((ele: any, i: number) => {
        ele.isPlus = false;
        ele.isMinus = false;
        if (index == i && ele.min_value < ele.set_recipe < ele.max_value) {
          ele.set_recipe++;
        }
        if (ele.min_value < ele.set_recipe < ele.max_value) {
          if (ele.set_recipe < ele.max_value) {
            ele.isPlus = true;
          }
          if (ele.min_value < ele.set_recipe) {
            ele.isMinus = true;
          }
        }
        return ele;
      });
    } else {
      this.loadrecipesOthers = this.loadrecipesOthers.map(
        (ele: any, i: number) => {
          ele.isPlus = false;
          ele.isMinus = false;
          if (index == i && ele.min_value < ele.set_recipe < ele.max_value) {
            ele.set_recipe++;
          }
          if (ele.min_value < ele.set_recipe < ele.max_value) {
            if (ele.set_recipe < ele.max_value) {
              ele.isPlus = true;
            }
            if (ele.min_value < ele.set_recipe) {
              ele.isMinus = true;
            }
          }
          return ele;
        }
      );
    }
  }

  proceedToCompleteMachineAndRecipeStup() {
    this.sharedService.sentClickEventpoStageCompleted('recipe-setup');
    this.router.navigate(['op/el/ip-carrier-scan']);
  }
}
