import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../../Shared/shared.service';
import { loadrecipe, poData } from '../tempering-model';
import { TemperingService } from '../tempering.service';

@Component({
  selector: 'app-tem-recipe-setup',
  templateUrl: './tem-recipe-setup.component.html',
  styleUrls: ['./tem-recipe-setup.component.scss'],
})
export class TemRecipeSetupComponent implements OnInit {
  turns: any = [];
  message: string = '';
  wsStatus: string = 'Connecting...';
  isLoading: boolean = false;
  destroyed$ = new Subject();
  tags: any = [];
  poData!: poData;
  machineId: any;

  wsStatuses: any = {
    '0': 'Not Connected',
    '1': 'Connected',
    '2': 'Disconnected',
    '3': 'Reconnecting',
  };

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
  po_ids: any[] = [];

  constructor(
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private helperService: HelperService,
    private router: Router,
    private appStorage: AppStorage,
    private temperingService: TemperingService
  ) {}

  ngOnInit(): void {
    this.po_ids = this.appStorage.get('PO_IDS');
    this.poData = this.appStorage.get('PO_DATA');

    const recipeAlready = localStorage.getItem('RECIPE_LOADED_FOR_PO')!;
    this.recipeAlready = JSON.parse(recipeAlready);
    const machine = localStorage.getItem('MACHINE')!;
    this.isRework = localStorage.getItem('IS_REWORK')!;
    this.machineData = JSON.parse(machine);

    const machineData = JSON.parse(localStorage.getItem('MACHINE') || '{}');
    if (machineData?.id) {
      this.machineId = machineData?.id;
    } else {
      this.machineId = localStorage.getItem('MACHINE_ID');
      this.machineId = JSON.parse(this.machineId);
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
        error: (error: any) => {
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
        if (ele.display_name == 'Recipe Id') {
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
    // this.sharedService.sentClickEventpoStageCompleted('recipe-setup');
    // this.po_ids.forEach((ele: any) => {
    //   this.temperingService.sentClickEventpoStageCompleted(
    //     'recipe-setup',
    //     ele.production_order_id
    //   );
    // });
    this.router.navigate(['op/tmp/operations']);
  }
}
