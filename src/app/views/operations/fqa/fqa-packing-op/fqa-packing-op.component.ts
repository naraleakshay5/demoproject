import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-fqa-packing-op',
  templateUrl: './fqa-packing-op.component.html',
  styleUrls: ['./fqa-packing-op.component.scss'],
})
export class FqaPackingOpComponent implements OnInit {
  isnext: boolean = false;

  hundredPartsWeight!: number;
  unitWeight: number = 0;
  restoBoxWeight!: number;
  qtyRestoBox: number = 0;
  looseBoxWeight!: number;
  qtyLooseBox: number = 0;
  isdisabled: boolean = false;
  constructor(private router: Router, private appStorage: AppStorage) {}

  ngOnInit(): void {}

  isNext() {
    this.isnext = true;
  }

  change() {
    this.unitWeight = this.hundredPartsWeight / 100;
  }

  changeRestoBoxWeight() {
    this.qtyRestoBox = this.restoBoxWeight / this.unitWeight;
  }

  changeLooseBoxWeight() {
    this.qtyLooseBox = this.looseBoxWeight / this.unitWeight;
  }

  proceed() {
    this.appStorage.set('UNIT_WEIGHT', this.unitWeight);
    this.appStorage.set('QTY_RESTO_BOX', this.qtyRestoBox);
    this.appStorage.set('QTY_LOOSE_BOX', this.qtyLooseBox);
    this.router.navigate(['op/fqa/resto-adjustment']);
  }

  onCheck(event: any) {
    this.isdisabled = event.target.checked;
  }
}
