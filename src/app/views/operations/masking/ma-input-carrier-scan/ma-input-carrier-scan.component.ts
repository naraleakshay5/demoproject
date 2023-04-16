import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ma-input-carrier-scan',
  templateUrl: './ma-input-carrier-scan.component.html',
  styleUrls: ['./ma-input-carrier-scan.component.scss'],
})
export class MaInputCarrierScanComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  jumFromIp() {
    this.router.navigate(['op/ma/material-check']);
  }
}
