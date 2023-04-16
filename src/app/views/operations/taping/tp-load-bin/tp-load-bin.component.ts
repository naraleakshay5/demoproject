import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tp-load-bin',
  templateUrl: './tp-load-bin.component.html',
  styleUrls: ['./tp-load-bin.component.scss'],
})
export class TpLoadBinComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  Start() {
    this.router.navigate(['op/tp/operation']);
  }
}
