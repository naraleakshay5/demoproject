import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { FqaService } from '../../fqa/fqa.service';
import { PO_DATA } from '../../Shared/shared-model';

@Component({
  selector: 'app-tp-online-resto',
  templateUrl: './tp-online-resto.component.html',
  styleUrls: ['./tp-online-resto.component.scss'],
})
export class TpOnlineRestoComponent implements OnInit {
  isOnlineResto: boolean = false;
  isOfflineResto: boolean = false;

  currentQty: number = 0;
  previousQty: number = 0;
  poData!: PO_DATA;
  lastPoData: any;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    this.poData = this.appStorage.get('PO_DATA');
    this.lastPoData = this.appStorage.get('LAST_PO_DATA');
    this.currentQty = +this.poData.target_quantity;
    this.previousQty = +this.lastPoData.remaining_quantity;
  }

  yes() {
    this.isOnlineResto = true;
  }

  proceed() {
    this.postResto();

    this.router.navigate(['op/tp/kardex-resto']);
  }

  yesResto() {
    this.router.navigate(['op/tp/kardex-resto']);
  }

  No() {
    this.isOfflineResto = true;
  }

  noResto() {
    // this.postResto();
    this.router.navigate(['op/tp/tool-change-over']);
  }

  postResto() {
    const reqBody = {
      po_id: this.poData.po_id,
      resto_po_pumber: this.lastPoData.po_number,
      is_online_resto: true,
      taping_quantity: +this.currentQty + +this.previousQty,
    };

    this.fqaService.postRestoBoxBind(reqBody).subscribe((res: any) => {});
  }
}
