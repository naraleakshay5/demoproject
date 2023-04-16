import { AoiService } from '../aoi.service';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { Component, OnInit } from '@angular/core';
import { PO_DATA } from '../../../Shared/shared-model';

@Component({
  selector: 'app-aoi-batch-result',
  templateUrl: './aoi-batch-result.component.html',
  styleUrls: ['./aoi-batch-result.component.scss'],
})
export class AoiBatchResultComponent implements OnInit {
  rejectedScannedBins: any;
  outputScannedBins: any;
  goodElementCount!: number;
  rejectedElementCount!: number;
  enablePopupModal: boolean = false;
  poData!: PO_DATA;

  constructor(
    private appStorage: AppStorage,
    private router: Router,
    private aoiService: AoiService
  ) {}

  ngOnInit(): void {
    const rejectedScannedBins = this.appStorage.get('REJECTED_SCANNED_BINS');
    this.rejectedScannedBins = rejectedScannedBins.length;
    const outputScannedBins = this.appStorage.get('OUTPUT_SCANNED_BINS');
    this.outputScannedBins = outputScannedBins.length;
    this.goodElementCount = this.appStorage.get('GOOD_ELEMENT_COUNT');
    this.rejectedElementCount = this.appStorage.get('REJECTED_ELEMENT_COUNT');
  }

  proceed() {
    this.poData = this.appStorage.get('PO_DATA');
    const data = {
      po_id: this.poData.po_id,
      good_count: this.goodElementCount,
      bad_count: this.rejectedElementCount,
    };

    this.aoiService.postCounts(data).subscribe({
      error: (error) => {
        console.info(error);
      },
    });

    this.enablePopupModal = true;
  }

  modalConfirmed() {
    this.router.navigate(['po-list']);
  }

  modalCanceled() {
    this.enablePopupModal = false;
  }
}
