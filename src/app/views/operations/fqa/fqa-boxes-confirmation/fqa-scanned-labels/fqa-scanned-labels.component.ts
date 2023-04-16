import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fqa-scanned-labels',
  templateUrl: './fqa-scanned-labels.component.html',
  styleUrls: ['./fqa-scanned-labels.component.scss'],
})
export class FqaScannedLabelsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/fqa/boxes-confirmation']);
  }
}
