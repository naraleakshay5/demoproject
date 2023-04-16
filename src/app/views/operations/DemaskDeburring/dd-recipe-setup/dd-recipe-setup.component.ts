import { PO_DATA } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../../Shared/shared.service';
import { loadrecipe } from '../demask-deburring-model';

@Component({
  selector: 'app-dd-recipe-setup',
  templateUrl: './dd-recipe-setup.component.html',
  styleUrls: ['./dd-recipe-setup.component.scss'],
})
export class DdRecipeSetupComponent implements OnInit {
  turns: any = [];
  message: string = '';
  wsStatus: string = 'Connecting...';
  isLoading: boolean = false;
  destroyed$ = new Subject();
  tags: any = [];
  poData!: PO_DATA;
  machineId: any;

  prodSetParams: any;
  prodRunningParams: any;
  isloadedRecipe: boolean = false;
  errorMessage: string | null = null;
  isSuccess: boolean = false;
  loadrecipes: loadrecipe[] = [];
  loadrecipesOthers: loadrecipe[] = [];
  recipeParameters: any;
  isSocketActive: any;
  recipeAlready: any;
  isRework: string | null = null;
  isBtnDisabled: boolean = false;
  isModify: boolean = false;
  is_same: boolean = false;
  machineData: any;

  constructor(
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private helperService: HelperService,
    private router: Router,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.getLoadRecipe();
    this.wsService
      .connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response: any) => {
          if (response.success && response.op === 'LOAD_PRODUCT_RECIPE') {
            this.isLoading = false;
            this.isSuccess = false;
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
        error: (error: any) => {
          console.info(error);
        },
      });
  }

  getLoadRecipe() {
    this.machineId = this.appStorage.get('MACHINE_ID');

    this.sharedService.getLoadRecipe(this.machineId).subscribe({
      next: (res: any) => {
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

        this.recipeAlready = this.appStorage.get('RECIPE_LOADED_FOR_PO');

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

          this.isRework = this.appStorage.get('IS_REWORK');
          if (this.isRework == 'true') {
            this.isBtnDisabled = true;
          }
        }

        if (this.recipeAlready && this.recipeAlready?.length > 0) {
          this.is_same = this.recipeAlready.every((ele: loadrecipe) => {
            return ele.value == ele.loaded_value;
          });
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  loadRecipe() {
    const time = this.helperService.getTimeString();
    this.isModify = true;

    if (this.isModify) {
      this.recipeParameters = this.recipeParameters.map((ele: any) => {
        if (ele.display_name == 'ID') {
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

    this.machineData = this.appStorage.get('MACHINE');
    this.wsService.send({
      op: 'LOAD_PRODUCT_RECIPE',
      nodes: nodes,
      prefix: this.machineData[0].node_prefix,
    });
    this.isModify = false;
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

  proceed() {
    this.appStorage.clear('IS_REWORK');
    this.sharedService.sentClickEventpoStageCompleted('recipe-setup');
    this.router.navigate(['op/dd/output-carrier-scan']);
  }
}
