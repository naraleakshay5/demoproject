import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aoi-supervisor',
  templateUrl: './aoi-supervisor.component.html',
  styleUrls: ['./aoi-supervisor.component.scss'],
})
export class AoiSupervisorComponent implements OnInit {
  isMajor: any;
  showDiv: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  checkout() {
    this.showDiv = true;
    this.router.navigate(['/aoi-sup/checkout']);
  }

  sorting() {
    this.showDiv = true;
    this.router.navigate(['/aoi-sup/sorting']);
  }

  processor() {
    this.showDiv = true;
    this.router.navigate(['/aoi-sup/processor']);
  }

  data() {
    this.showDiv = true;
    this.router.navigate(['/aoi-sup/data']);
  }
}
