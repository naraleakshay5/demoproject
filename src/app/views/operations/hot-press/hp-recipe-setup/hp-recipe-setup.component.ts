import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotPressService } from '../hot-press.service';
import { WebsocketService } from 'src/app/websocket.service';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HelperService } from '../../../../helpers/helper.service';
import { SharedService } from '../../Shared/shared.service';
import { loadrecipe, PO_DATA } from '../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-hp-recipe-setup',
  templateUrl: './hp-recipe-setup.component.html',
  styleUrls: ['./hp-recipe-setup.component.scss'],
})
export class HpRecipeSetupComponent implements OnInit {
  poData!: PO_DATA;
  is_Proceed: boolean = false;
  is_same: boolean = false;
  getclickRemTrays: any;
  loadrecipes: loadrecipe[] = [];
  machineId: any;
  processId: any;
  isLoading: boolean = true;
  destroyed$ = new Subject();
  tags: any = [];
  message: any;
  errorMessage: string | null = null;
  isSuccess: boolean = false;
  recipeParameters: any;
  isSocketActive: any;
  recipeAlready: any;
  isRework: string | null = null;
  isBtnDisabled: boolean = false;
  isModify: boolean = false;
  machineData: any;
  operationalsLogs: any[] = [];

  constructor(
    private router: Router,
    private hotPressService: HotPressService,
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private helperService: HelperService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('recipe-setup');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.machineData = this.appStorage.get('MACHINE');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.isRework = this.appStorage.get('IS_REWORK');
    this.recipeAlready = this.appStorage.get('RECIPE_LOADED_FOR_PO');
    this.route.queryParams.subscribe((params: any) => {
      this.is_Proceed = params.remaining_trays;
    });
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
              (ele: loadrecipe) =>
                ele.category === 'main' || ele.category === 'other'
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

  isProceed() {
    this.is_Proceed = true;
  }

  proceed() {
    this.is_Proceed = false;
    this.router.navigate(['op/hp/operations']);
    this.wsService.sendNode(
      this.hotPressService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      false
    );
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
        (ele: loadrecipe) => ele.category === 'main' || ele.category === 'other'
      );

      if (!this.recipeAlready && this.recipeAlready == null) {
        this.loadRecipe();
      } else {
        this.isLoading = false;
        this.isSuccess = true;
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
          (ele: loadrecipe) =>
            ele.category === 'main' || ele.category === 'other'
        );

        this.loadrecipes = this.loadrecipes.map((ele: any, i: number) => {
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
        // if (this.isRework == 'true') {
        this.isBtnDisabled = true;
        // }
      }

      this.is_same = this.loadrecipes.every((ele: loadrecipe) => {
        return ele.value == ele.loaded_value;
      });
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
      if (ele.display_name == 'Recipe Id') {
        ele.value = ele.value.concat(time);
      }
      return ele;
    });
    // }

    const setRecipeParameters = this.loadrecipes.map((key: any) => {
      key.value = key.set_recipe;
      return key;
    });

    const nodes = [...this.recipeParameters, ...setRecipeParameters];
    this.appStorage.set('RECIPE_LOADED_FOR_PO', nodes);

    this.isLoading = true;
    this.wsService.send({
      op: 'LOAD_PRODUCT_RECIPE',
      nodes: nodes,
      prefix: this.machineData[0].node_prefix,
    });
    this.isModify = false;
  }

  plus(index: number) {
    this.isModify = true;

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
  }

  minus(index: number) {
    this.isModify = true;
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

  getTimeString() {
    const time =
      String(new Date().getHours()) +
      String(new Date().getMinutes()) +
      String(new Date().getSeconds());
    return time;
  }
}
