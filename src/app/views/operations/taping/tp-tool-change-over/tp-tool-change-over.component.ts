import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-tp-tool-change-over',
  templateUrl: './tp-tool-change-over.component.html',
  styleUrls: ['./tp-tool-change-over.component.scss'],
})
export class TpToolChangeOverComponent implements OnInit {
  isAmmo: boolean = false;
  isReel: boolean = false;
  constructor(private appStorage: AppStorage, private router: Router) {}

  ngOnInit(): void {}

  ammoPacking() {
    this.isAmmo = true;
  }

  reelPacking() {
    this.isReel = true;
  }

  proceed(type: any) {
    this.appStorage.set('RECIPE_TYPE', type);
    this.router.navigate(['op/tp/recipe-setup']);
  }
}
