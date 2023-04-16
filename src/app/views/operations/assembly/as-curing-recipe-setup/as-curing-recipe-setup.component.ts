import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { loadrecipe } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-curing-recipe-setup',
  templateUrl: './as-curing-recipe-setup.component.html',
  styleUrls: ['./as-curing-recipe-setup.component.scss'],
})
export class AsCuringRecipeSetupComponent implements OnInit {
  turns: any = [];
  message: string = '';
  wsStatus: string = 'Connecting...';
  isLoading: boolean = false;
  destroyed$ = new Subject();
  tags: any = [];
  wicPoData!: PO_DATA;

  wsStatuses: any = {
    '0': 'Not Connected',
    '1': 'Connected',
    '2': 'Disconnected',
    '3': 'Reconnecting',
  };

  kpMachineDetails: {
    machine_name: string;
    channel_name: string;
  } = { machine_name: '', channel_name: '' };
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
    private assemblyService: AssemblyService,
    private router: Router,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.wicPoData = this.appStorage.get('TEM_CURING_PO_DATA');
    this.recipeAlready = this.appStorage.get('CURING_RECIPE_LOADED_FOR_PO');
    this.isRework = this.appStorage.get('IS_REWORK')!;
    this.machineData = this.appStorage.get('MACHINE');
    this.machineData = this.machineData.find(
      (ele: any) => ele.is_primary == false
    );

    // this.wsService.status.subscribe({
    //   next: (statusCode: Number) => {
    //     this.wsStatus = this.wsStatuses[+statusCode];
    //   },
    // });

    this.getLoadRecipe();

    // this.wsService.status.subscribe({
    //   next: (statusCode: Number) => {
    //     this.isSocketActive = statusCode === 1;
    //   },
    // });
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

            this.appStorage.set('CURING_RECIPE_LOADED_FOR_PO', response.nodes);
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
    this.sharedService
      .getLoadRecipe(this.machineData.id)
      .subscribe((res: any) => {
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
    // if (!this.isSocketActive) {
    //   this.errorMessage =
    //     'Recipe Cannot Be loaded, Cannot establish connection to server.';
    //   return;
    // }
    const time = this.helperService.getTimeString();

    this.isModify = true;
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

    localStorage.setItem('CURING_RECIPE_LOADED_FOR_PO', JSON.stringify(nodes));
    this.isLoading = true;
    // this.wsService.send({
    //   op: 'LOAD_PRODUCT_RECIPE',
    //   nodes: nodes,
    //   prefix: this.machineData.node_prefix,
    // });
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
    localStorage.removeItem('IS_REWORK');
    this.router.navigate(['op/as/metal-trays']);
    this.assemblyService.sentClickEventpoStageCompleted(
      'recipe-setup',
      this.wicPoData.po_id
    );
  }
}
