import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res-tank-filling',
  templateUrl: './res-tank-filling.component.html',
  styleUrls: ['./res-tank-filling.component.scss'],
})
export class ResTankFillingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/res']);
  }
}
