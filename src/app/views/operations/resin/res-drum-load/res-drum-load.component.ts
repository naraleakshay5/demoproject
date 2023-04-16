import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cilCheck, cilWarning } from '@coreui/icons';

@Component({
  selector: 'app-res-drum-load',
  templateUrl: './res-drum-load.component.html',
  styleUrls: ['./res-drum-load.component.scss'],
})
export class ResDrumLoadComponent implements OnInit {
  icons = { cilCheck, cilWarning };
  tankA: string = '';
  tankB: string = '';
  hardenerTank: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/res']);
  }

  focusOut() {}
}
