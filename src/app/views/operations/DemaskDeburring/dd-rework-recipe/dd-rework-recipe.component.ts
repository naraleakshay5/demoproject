import { PO_DATA } from './../../Shared/shared-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { loadrecipe } from '../demask-deburring-model';

@Component({
  selector: 'app-dd-rework-recipe',
  templateUrl: './dd-rework-recipe.component.html',
  styleUrls: ['./dd-rework-recipe.component.scss'],
})
export class DdReworkRecipeComponent implements OnInit {
  turns: any = [];
  message: string = '';
  wsStatus: string = 'Connecting...';
  isLoading: boolean = false;
  destroyed$ = new Subject();
  tags: any = [];
  poData!: PO_DATA;
  machineId!: number;

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
  machineData: any;

  constructor(
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
            this.appStorage.set('REWORK_RECIPE_LOADED_FOR_PO', response.nodes);
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
    let data = this.appStorage.get('RECIPE_LOADED_FOR_PO');

    data = data.map((key: any) => ({
      ...key,
      set_recipe: key.value,
      isMinus: false,
      isPlus: false,
    }));

    this.recipeParameters = data.filter(
      (ele: loadrecipe) => ele.category === 'internal'
    );

    const loadrecipes = data.filter(
      (ele: loadrecipe) => ele.category === 'main'
    );

    this.loadrecipes = loadrecipes.filter((ele: any) =>
      ele.display_name.includes('Deburing')
    );

    this.loadrecipesOthers = data.filter(
      (ele: loadrecipe) => ele.category === 'other'
    );
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
    this.appStorage.set('REWORK_RECIPE_LOADED_FOR_PO', nodes);
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
    this.router.navigate(['op/dd/rework-operations']);
  }
}
