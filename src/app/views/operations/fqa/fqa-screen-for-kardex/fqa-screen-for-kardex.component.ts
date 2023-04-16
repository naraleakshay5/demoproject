import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { FqaService } from '../fqa.service';

@Component({
  selector: 'app-fqa-screen-for-kardex',
  templateUrl: './fqa-screen-for-kardex.component.html',
  styleUrls: ['./fqa-screen-for-kardex.component.scss'],
})
export class FqaScreenForKardexComponent implements OnInit {
  elementType = 'svg';
  width = 3;
  height = 50;
  width1 = 2;
  height1 = 50;
  format = 'CODE128';

  poData!: PO_DATA;
  machine: any;
  constructor(
    private appStorage: AppStorage,
    private router: Router,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    this.machine = this.appStorage.get('MACHINE');
    this.poData = this.appStorage.get('PO_DATA');
  }

  proceed() {
    this.router.navigate(['/po-list']);
  }
}
