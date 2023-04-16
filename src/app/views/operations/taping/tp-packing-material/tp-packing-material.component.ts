import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-tp-packing-material',
  templateUrl: './tp-packing-material.component.html',
  styleUrls: ['./tp-packing-material.component.scss'],
})
export class TpPackingMaterialComponent implements OnInit {
  isClear: boolean = false;
  count: number = 0;
  recipeType: string = '';
  packingBox: string = 'V7066';
  isCorrectSelected: boolean = false;
  isWrongSelected: boolean = false;
  constructor(private appStorage: AppStorage, private router: Router) {}

  ngOnInit(): void {
    this.recipeType = this.appStorage.get('RECIPE_TYPE');
  }

  proceed(type: any) {
    this.appStorage.clear('RECIPE_TYPE');
    this.router.navigate(['op/tp/load-bin']);
  }

  onCheck(event: any) {
    this.isClear = event.target.checked;

    if (this.isClear) {
      this.count++;
    } else {
      this.count--;
    }
  }

  onToolSelected(value: any) {
    this.isWrongSelected = false;
    this.isCorrectSelected = false;

    if (value === this.packingBox) {
      this.isCorrectSelected = true;
    } else {
      this.isWrongSelected = true;
    }
  }
}
