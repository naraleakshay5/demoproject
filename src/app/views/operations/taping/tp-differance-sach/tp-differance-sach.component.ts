import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { FqaService } from '../../fqa/fqa.service';
import { PO_DATA } from '../../Shared/shared-model';

@Component({
  selector: 'app-tp-differance-sach',
  templateUrl: './tp-differance-sach.component.html',
  styleUrls: ['./tp-differance-sach.component.scss'],
})
export class TpDifferanceSachComponent implements OnInit {
  poData!: PO_DATA;
  totalQty: number = 0;
  constructor(
    private router: Router,
    private fqaService: FqaService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
  }

  proceed() {
    const reqBody = {
      po_id: this.poData.po_id,
      resto_quantity: this.totalQty,
    };

    this.fqaService.postRestoQty(reqBody).subscribe((res: any) => {
      this.router.navigate(['op/tp/scrap-booking']);
    });
  }
}
