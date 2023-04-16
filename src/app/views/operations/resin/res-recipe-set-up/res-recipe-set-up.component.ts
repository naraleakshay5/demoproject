import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { WebsocketService } from 'src/app/websocket.service';
import { loadrecipe, PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-res-recipe-set-up',
  templateUrl: './res-recipe-set-up.component.html',
  styleUrls: ['./res-recipe-set-up.component.scss'],
})
export class ResRecipeSetUpComponent implements OnInit {
  poData!: PO_DATA;
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const currentUser = localStorage.getItem('USER_DATA')!;
    const machine = localStorage.getItem('MACHINE')!;
    this.isRework = localStorage.getItem('IS_REWORK')!;
    this.machineData = JSON.parse(machine);
    const recipeAlready = localStorage.getItem('RECIPE_LOADED_FOR_PO')!;
    this.recipeAlready = JSON.parse(recipeAlready);
    this.route.queryParams.subscribe((params: any) => {});
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

      if (!this.recipeAlready && this.recipeAlready == null) {
        this.loadRecipe();
      } else {
        this.isLoading = false;
        this.isSuccess = true;
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
        if (this.isRework == 'true') {
          this.isBtnDisabled = true;
        }
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

    const nodes = [...this.recipeParameters, ...setRecipeParameters];
    localStorage.setItem('RECIPE_LOADED_FOR_PO', JSON.stringify(nodes));
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

  proceed() {
    this.router.navigate(['op/res']);
  }
}
