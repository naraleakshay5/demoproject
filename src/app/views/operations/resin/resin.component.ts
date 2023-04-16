import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resin',
  templateUrl: './resin.component.html',
  styleUrls: ['./resin.component.scss'],
})
export class ResinComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  setRecipe() {
    this.router.navigate(['op/res/recipe-setup']);
  }

  tankFilling() {
    this.router.navigate(['op/res/tank-filling']);
  }

  loadDrum() {
    this.router.navigate(['op/res/load-drum']);
  }

  stroke() {
    this.router.navigate(['op/res/stroke-weight']);
  }
}
