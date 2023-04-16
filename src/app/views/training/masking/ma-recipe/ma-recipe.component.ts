import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ma-recipe',
  templateUrl: './ma-recipe.component.html',
  styleUrls: ['./ma-recipe.component.scss'],
})
export class MaRecipeComponent implements OnInit {
  recipe: any = [
    {
      nodeId:
        'OMRON_FINS.Masking_MC_28.product_recipe_set_parameters.OTP_PROD_RCP_Machine_Speed_RPM',
      value: 100,
      reference_value: 100,
      datatype: 'dword',
      min_value: 75,
      max_value: 150,
      display_name: 'Machine Speed RPM',
      category: 'main',
      machine_prefix: 'OMRON_FINS.Masking_MC_28',
      loaded_value: 100,
    },
    {
      nodeId:
        'OMRON_FINS.Masking_MC_28.product_recipe_set_parameters.OTP_PROD_RCP_ELE_PWHL',
      value: 600,
      reference_value: 600,
      datatype: 'dword',
      min_value: 1,
      max_value: 600,
      display_name: 'Element Per Wheel',
      category: 'main',
      machine_prefix: 'OMRON_FINS.Masking_MC_28',
      loaded_value: 600,
    },
  ];

  isBtnDisabledMinus: boolean = false;
  isBtnDisabledPlus: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  loadRecipe() {}

  minus(data: any) {
    data.value--;
    this.isBtnDisabledPlus = false;
    if (data.value <= data.min_value) {
      this.isBtnDisabledMinus = true;
    }
  }
  plus(data: any) {
    data.value++;
    this.isBtnDisabledMinus = false;
    if (data.max_value <= data.value) {
      this.isBtnDisabledPlus = true;
    }
  }

  proceedToCompleteMachineAndRecipeStup() {
    this.router.navigate(['training/masking-input-scan']);
  }
}
