import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';
import { SharedService } from '../../Shared/shared.service';
import { WindingService } from '../winding.service';
import { loadrecipe, PO_DATA } from '../../Shared/shared-model';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-wd-recipe-setup',
  templateUrl: './wd-recipe-setup.component.html',
  styleUrls: ['./wd-recipe-setup.component.scss'],
})
export class WdRecipeSetupComponent implements OnInit {
  turns: any = [];
  message: string = '';
  wsStatus: string = 'Connecting...';
  isLoading: boolean = false;
  destroyed$ = new Subject();
  tags: any = [];
  poData!: PO_DATA;
  machineId: any;
  previousSachSame: boolean = false;

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
  modifyCount: any = 0;
  makeTrialPart: boolean = false;

  constructor(
    private windingService: WindingService,
    private sharedService: SharedService,
    private wsService: WebsocketService,
    private helperService: HelperService,
    private router: Router,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('recipe-setup');
    this.poData = this.appStorage.get('PO_DATA');
    this.isRework = this.appStorage.get('IS_REWORK');
    this.machineData = this.appStorage.get('MACHINE');
    this.previousSachSame = this.appStorage.get('PREVIOUS_BATCH_SAME');
    this.recipeAlready =
      this.previousSachSame === true
        ? this.appStorage.get('PERVIOUS_RECIPE_LOADED_FOR_PO')
        : this.appStorage.get('RECIPE_LOADED_FOR_PO');
    const modifyCount = this.appStorage.get('RECIPE_MODIFY_COUNT');
    if (modifyCount != null) {
      this.modifyCount = modifyCount;
    }

    this.machineId = this.appStorage.get('MACHINE_ID');

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
            this.appStorage.set(
              'PERVIOUS_RECIPE_LOADED_FOR_PO',
              response.nodes
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
        isMinus: true,
        isPlus: true,
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
          ele.isPlus = true;
          ele.isMinus = true;

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

    // this.isModify = true;
    // if (this.isModify) {
    this.recipeParameters = this.recipeParameters.map((ele: any) => {
      if (ele.display_name.toLowerCase().includes('id')) {
        ele.value = ele.value.concat(time);
      }
      return ele;
    });
    // }

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
    this.appStorage.set('PERVIOUS_RECIPE_LOADED_FOR_PO', nodes);
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

  // proceed() {
  //   if (this.isRework == 'true') {
  //     this.modifyCount = this.modifyCount++;
  //     this.appStorage.set('RECIPE_MODIFY_COUNT', this.modifyCount);
  //     this.router.navigate([
  //       'op/wd/recipe-setup/recipe-setup/visual-inspection',
  //     ]);
  //   } else {
  //     this.router.navigate(['op/wd/recipe-setup/making-trial-parts']);
  //   }

  //   this.appStorage.clear('IS_REWORK');
  //   this.wsService.sendNode(
  //     this.windingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
  //     false
  //   );
  // }

  // confirmModalToProceed() {
  //   this.proceed();
  // }

  // proceedTomakeTrialPart() {
  //   this.makeTrialPart = true;
  // }

  // cancelToProceed() {
  //   this.makeTrialPart = false;
  // }

  confirmModalToCompleteMaterialCheck() {
    this.router.navigate(['op/wd/output-carrier']);
    this.appStorage.set('PREVIOUS_BATCH_SAME', false);
  }

  cancelAllRollScanned() {
    this.previousSachSame = false;
  }

  gotoSpc() {
    const user = this.appStorage.get('USER_DATA');
    if (user.role === 'Setter') {
      this.router.navigate(['op/wd/spc']);
    } else {
      this.router.navigate(['op/wd/visual-inspection']);
    }
  }
}
