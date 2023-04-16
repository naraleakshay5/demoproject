import { SharedService } from './../../Shared/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../masking-model';
import { WebsocketService } from 'src/app/websocket.service';
import { loadrecipe } from '../../Shared/shared-model';
import { HelperService } from 'src/app/helpers/helper.service';

@Component({
  selector: 'app-ma-recipe-setup',
  templateUrl: './ma-recipe-setup.component.html',
  styleUrls: ['./ma-recipe-setup.component.scss'],
})
export class MaRecipeSetupComponent implements OnInit {
  poData!: PoData;
  machineId!: number;
  recipe: any;
  isLoading: boolean = false;
  destroyed$ = new Subject();
  machineSpeed: any;
  recipeAlready: any;
  machineData: any;

  isloadedRecipe: boolean = false;
  errorMessage: string | null = null;
  isSuccess: boolean = false;
  loadrecipes: loadrecipe[] = [];
  loadrecipesOthers: loadrecipe[] = [];
  recipeParameters: any;
  isModify: boolean = false;
  isRework: string | null = null;
  isBtnDisabled: boolean = false;
  is_same: boolean = false;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private helperService: HelperService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const recipeAlready = localStorage.getItem('RECIPE_LOADED_FOR_PO')!;
    this.recipeAlready = JSON.parse(recipeAlready);
    const machine = localStorage.getItem('MACHINE')!;
    if (JSON.parse(machine)) {
      this.machineData = JSON.parse(machine);
    }

    this.isRework = localStorage.getItem('IS_REWORK')!;

    const machineData = JSON.parse(localStorage.getItem('machine') || '{}');
    if (machineData?.id) {
      this.machineId = machineData?.id;
    } else {
      const machineId = localStorage.getItem('MACHINE_ID')!;
      this.machineId = JSON.parse(machineId);
    }
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
            localStorage.setItem(
              'RECIPE_LOADED_FOR_PO',
              JSON.stringify(response.nodes)
            );
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
    localStorage.setItem('RECIPE_LOADED_FOR_PO', JSON.stringify(nodes));
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
    this.router.navigate(['op/ma/output-carrier-scan']);
  }
}
