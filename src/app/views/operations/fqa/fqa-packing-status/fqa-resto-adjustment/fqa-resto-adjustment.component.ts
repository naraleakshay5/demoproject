import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-fqa-resto-adjustment',
  templateUrl: './fqa-resto-adjustment.component.html',
  styleUrls: ['./fqa-resto-adjustment.component.scss'],
})
export class FqaRestoAdjustmentComponent implements OnInit {
  unitWeight: number = 0;
  qtyRestoBox: number = 0;
  qtyLooseBox: number = 0;
  totalQtyPerBOx: number = 250; //Todo
  removeLb: number = 0;
  isRemoveLb: boolean = false;
  isRemoveFb: boolean = false;
  noRemove: boolean = false;
  removeFb: number = 0;
  isdisabled: boolean = false;

  constructor(private router: Router, private appStorage: AppStorage) {}

  ngOnInit(): void {
    this.unitWeight = this.appStorage.get('UNIT_WEIGHT');
    this.qtyRestoBox = this.appStorage.get('QTY_RESTO_BOX');
    this.qtyLooseBox = this.appStorage.get('QTY_LOOSE_BOX');

    this.cal();
  }

  cal() {
    const lbrb = this.qtyRestoBox + this.qtyLooseBox;
    this.isRemoveLb = this.totalQtyPerBOx < lbrb ? true : false;
    const fbrb = this.totalQtyPerBOx - this.qtyRestoBox;
    this.removeLb = this.qtyLooseBox - fbrb;
    this.isRemoveFb = this.totalQtyPerBOx > lbrb ? true : false;
    this.removeFb = this.totalQtyPerBOx - this.qtyRestoBox;
    this.noRemove = this.totalQtyPerBOx == lbrb ? true : false;
  }

  proceed() {
    this.router.navigate(['op/fqa/packing-status']);
  }

  onCheck(event: any) {
    this.isdisabled = event.target.checked;
  }
}
