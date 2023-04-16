import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { FqaService } from '../fqa.service';

@Component({
  selector: 'app-fqa-packing-status',
  templateUrl: './fqa-packing-status.component.html',
  styleUrls: ['./fqa-packing-status.component.scss'],
})
export class FqaPackingStatusComponent implements OnInit {
  unitWeight: number = 0;
  qtyRestoBox: number = 0;
  qtyLooseBox: number = 0;
  totalQtyPerBOx: number = 500;
  removeLb: number = 0;
  isRemoveLb: boolean = false;
  isRemoveFb: boolean = false;
  noRemove: boolean = false;
  removeFb: number = 0;
  isdisabled: boolean = false;

  poData!: PO_DATA;
  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
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
    let quantity_added_from_batch = 0;
    let quantity_added_to_batch = 0;
    if (!this.isRemoveFb && this.isRemoveLb && !this.noRemove) {
      quantity_added_from_batch = this.qtyRestoBox;
      quantity_added_to_batch = this.removeLb;
    } else if (this.isRemoveFb && !this.isRemoveLb && !this.noRemove) {
      quantity_added_from_batch = this.qtyRestoBox;
      quantity_added_to_batch = this.qtyLooseBox + this.qtyRestoBox;
    } else {
      quantity_added_from_batch = this.qtyRestoBox;
    }

    const reqBody = {
      po_id: this.poData.po_id,
      unit_wt: this.unitWeight,
      total_quantity: this.poData.target_quantity,
      no_of_boxes: +this.poData.target_quantity / this.totalQtyPerBOx,
      quantity_per_box: this.totalQtyPerBOx,
      quantity_added_from_batch: quantity_added_from_batch,
      quantity_added_to_batch: quantity_added_to_batch,
    };

    this.fqaService.postPackingStatus(reqBody).subscribe((res: any) => {
      this.router.navigate(['op/fqa/fqa-po-checkout']);
      this.appStorage.set(
        'INSPECTORTYPE',
        this.fqaService.fqaProcessLog.packing
      );
      this.appStorage.clear('QTY_LOOSE_BOX');
      this.appStorage.clear('UNIT_WEIGHT');
      this.appStorage.clear('QTY_RESTO_BOX');
    });
  }
}
