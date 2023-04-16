import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../../Shared/shared-model';
import { cilCheck, cilWarning, cilAlarm } from '@coreui/icons';
import { FqaService } from '../../fqa.service';

@Component({
  selector: 'app-fqa-scanned-resto-box',
  templateUrl: './fqa-scanned-resto-box.component.html',
  styleUrls: ['./fqa-scanned-resto-box.component.scss'],
})
export class FqaScannedRestoBoxComponent implements OnInit {
  icons = { cilCheck, cilWarning };

  poData!: PO_DATA;
  sachNumber!: any;
  poNumber!: any;
  isWrongBox!: boolean | null;
  isCorrectBox: boolean = false;
  isPoNumber: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
  }

  focusOut() {
    this.isWrongBox =
      this.poData.sach_number === this.sachNumber ? false : true;
    this.isCorrectBox =
      this.poData.sach_number === this.sachNumber ? true : false;
  }

  proceed() {
    this.router.navigate(['op/fqa/quality-inspection']);
    localStorage.setItem('TYPE', 'restoBoxed');
    const reqBody = {
      po_id: this.poData.po_id,
      resto_po_pumber: this.poNumber,
      is_online_resto: false,
    };

    this.fqaService.postRestoBoxBind(reqBody).subscribe((res: any) => {});
  }

  yes() {
    this.sachNumber = null;
    this.poNumber = null;
    this.isWrongBox = false;
  }

  no() {}
}
