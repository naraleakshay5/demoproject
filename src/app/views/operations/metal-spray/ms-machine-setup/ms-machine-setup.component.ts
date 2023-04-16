import { MetalSprayService } from './../metal-spray.service';
import { Recipe } from './../metal-spray-model';
import { PoData } from './../../Shared/shared-model';
import { HelperService } from 'src/app/helpers/helper.service';
import { SharedService } from './../../Shared/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { loadrecipe } from '../../Shared/shared-model';
import { WebsocketService } from 'src/app/websocket.service';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-ms-machine-setup',
  templateUrl: './ms-machine-setup.component.html',
  styleUrls: ['./ms-machine-setup.component.scss'],
})
export class MsMachineSetupComponent implements OnInit {
  enablePopmodal!: boolean;
  enableRecipe: boolean = false;
  machineId!: number;
  poData!: PoData;
  recipeAlready: any;
  isLoading: boolean = false;
  destroyed$ = new Subject();
  recipeParameters: any;
  loadrecipes: loadrecipe[] = [];
  loadrecipesOthers: loadrecipe[] = [];
  isModify: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string | null = null;
  isBtnDisabled: boolean = false;
  sprayParam!: any[];
  speedParam!: any[];
  wireSpeed: WireSpeed[] = [];
  sprayCycle: any[] = [];
  isRework: string | null = null;
  is_same: boolean = false;
  wheelInput: any;
  disableWheelInput: boolean = false;
  machineData: any;
  gun1Recipe: Recipe[] = [];
  gun2Recipe: Recipe[] = [];
  data: any;
  formatted: any;

  isCount: number = 0;
  loadRecipeSub!: Subscription;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private helperService: HelperService,
    private metalSprayService: MetalSprayService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const recipeAlready = localStorage.getItem('RECIPE_LOADED_FOR_PO')!;
    this.recipeAlready = JSON.parse(recipeAlready);
    const machine = localStorage.getItem('MACHINE')!;
    this.machineData = JSON.parse(machine);

    const machineData = JSON.parse(localStorage.getItem('MACHINE') || '{}');
    if (machineData?.id) {
      this.machineId = machineData?.id;
    } else {
      const machineId = localStorage.getItem('MACHINE_ID')!;
      this.machineId = JSON.parse(machineId);
    }

    const recipe = localStorage.getItem('RECIPE')!;
    if (JSON.parse(recipe)) {
      this.data = JSON.parse(recipe);
    }

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
    this.recipeParameters = this.data.filter(
      (ele: loadrecipe) => ele.category === 'internal'
    );

    this.loadrecipes = this.data.filter(
      (ele: loadrecipe) => ele.category === 'main'
    );

    this.loadrecipesOthers = this.data.filter(
      (ele: loadrecipe) => ele.category === 'others'
    );

    // this.makeSprayObject(this.loadrecipes);
    this.makeRecipeObject(this.loadrecipes);

    // this.wireSpeedRecipe(this.loadrecipes);

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
  }

  //Kept fo future use
  // wireSpeedRecipe(data: any): any {
  //   for (let i = 1; i < data.length; i++) {
  //     data.filter((ele: any) => {
  //       if (
  //         ele.node_id ==
  //         'Metal_Spray.Machine No 4.product_recipe_set_parameters.OTP_PROD_RCP_Gun2_Spray_Cycle_' +
  //           i +
  //           '_Wire_Speed'
  //       ) {
  //         if (ele) {
  //           const dt: WireSpeed = {
  //             category: ele.category,
  //             datatype: ele.datatype,
  //             display_name: 'Wire Speed Cycle ' + i,
  //             isMinus: ele.isMinus,
  //             isPlus: ele.isPlus,
  //             machine_prefix: ele.machine_prefix,
  //             g1_max_value: data[i].max_value,
  //             g1_min_value: data[i].max_value,
  //             g2_max_value: ele.max_value,
  //             g2_min_value: ele.min_value,
  //             nodeId: ele.node_id,
  //             setRecipe: ele.setRecipe,
  //             value: ele.value,
  //             gun1Value: data[i].value,
  //             gun2Value: ele.value,
  //           };
  //           this.wireSpeed.push(dt);
  //         }
  //       }
  //     });
  //   }

  //   return this.wireSpeed;
  // }

  // makeSprayObject(data: any): any {
  //   for (let i = 0; i < data.length; i++) {
  //     data.filter((ele: any) => {
  //       if (
  //         ele.node_id ==
  //         'Metal_Spray.Machine No 4.product_recipe_set_parameters.OTP_PROD_RCP_Gun1_Spray_Cycle'
  //       ) {
  //         if (ele) {
  //           const dt: any = {
  //             category: ele.category,
  //             datatype: ele.datatype,
  //             display_name: ele.display_name,
  //             machine_prefix: ele.machine_prefix,
  //             g1_max_value: data[i].max_value,
  //             g1_min_value: data[i].max_value,
  //             g2_max_value: ele.max_value,
  //             g2_min_value: ele.min_value,
  //             node_id: ele.node_id,
  //             gun1Value: data[i].value,
  //             gun2Value: ele.value,
  //           };
  //           this.sprayCycle.push(dt);
  //         }
  //       }
  //     });
  //   }
  // }

  makeRecipeObject(data: any): any {
    this.formatted = groupBy(data, (d: any) => d.gun);
  }

  loadRecipe() {
    const time = this.helperService.getTimeString();

    if (this.isModify) {
      this.recipeParameters = this.recipeParameters.map((ele: any) => {
        if (ele.display_name == 'Recipe Id') {
          ele.value = ele.value.concat(time);
        } else {
          return ele;
        }
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

  enablePopupModal() {
    this.enablePopmodal = true;
  }

  proceedToRecipe() {
    this.enableRecipe = true;
  }

  proceedToCompleteMachineAndRecipeStup() {
    this.metalSprayService.doubleRender = 0;

    this.sharedService.sentClickEventpoStageCompleted('recipe-setup');
    this.router.navigate(['/op/ms/metal-spray']);
  }
}

export interface WireSpeed {
  category: string;
  datatype: string;
  display_name: string;
  isMinus: boolean;
  isPlus: boolean;
  machine_prefix: string;
  g1_max_value: number;
  g1_min_value: number;
  g2_max_value: number;
  g2_min_value: number;
  nodeId: string;
  setRecipe: number;
  value: number;
  gun1Value: number;
  gun2Value: number;
}
