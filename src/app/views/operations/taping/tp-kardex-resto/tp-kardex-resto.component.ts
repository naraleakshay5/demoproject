import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { FqaService } from '../../fqa/fqa.service';
import { PO_DATA } from '../../Shared/shared-model';

@Component({
  selector: 'app-tp-kardex-resto',
  templateUrl: './tp-kardex-resto.component.html',
  styleUrls: ['./tp-kardex-resto.component.scss'],
})
export class TpKardexRestoComponent implements OnInit {
  isMechInspection: boolean = false;
  sameSach: boolean = false;
  poData!: PO_DATA;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    const lastPoData = this.appStorage.get('LAST_PO_DATA');
    this.poData = this.appStorage.get('PO_DATA');
    this.sameSach = lastPoData?.sach_number;
  }

  proceed() {
    this.router.navigate(['op/tp/scan-screen']);
    // this.router.navigate(['/po-list']);
    const reqBody = {
      po_id: this.appStorage.get('PO_DATA').po_id,
      machine_id: this.appStorage.get('MACHINE_ID'),
      stage: this.fqaService.fqaProcessLog.tapingMechanicalInProcess,
    };

    this.fqaService.postFqaProcessLog(reqBody).subscribe((res: any) => {});
  }
}
