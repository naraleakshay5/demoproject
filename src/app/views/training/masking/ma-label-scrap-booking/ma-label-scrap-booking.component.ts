import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { ScrapReason } from 'src/app/views/operations/masking/masking-model';

@Component({
  selector: 'app-ma-label-scrap-booking',
  templateUrl: './ma-label-scrap-booking.component.html',
  styleUrls: ['./ma-label-scrap-booking.component.scss'],
})
export class MaLabelScrapBookingComponent implements OnInit {
  totalWheelCount!: number;
  fullWheelCount!: number;
  partialWheelCount!: number;

  labelDetails: any = {
    label_name: 'Zinc',
    label_color: '#f74dbc',
  };
  completeLabelPrinting: boolean = false;
  completeScrapBooking: boolean = false;

  scrapForm!: FormGroup;
  scrap!: FormArray;
  noScrap: boolean = false;

  scrapReason: ScrapReason[] = [
    {
      id: 1,
      master_process_id: 7,
      reason_text: 'Element Damage',
    },
    {
      id: 2,
      master_process_id: 7,
      reason_text: 'Missing Quantity',
    },
  ];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  enableModalPopup: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const outputWheels = this.appStorage.get('OUTPUT_SCANNED_WHEEL');
    this.totalWheelCount = outputWheels?.length;
    this.partialWheelCount = 1;
    this.fullWheelCount = this.totalWheelCount - 1;

    this.getScrapFormData();
    this.getScrapReason();
  }

  printLabel() {
    this.completeLabelPrinting = true;
    this.completeScrapBooking = true;
  }

  getScrapFormData() {
    this.scrapForm = this.fb.group({
      scrap: this.fb.array([this.initTimes()]),
    });
    this.fa.valueChanges.subscribe((value) => {
      this.selectedscrapReasonAll = value.map((v: any) => v.reason);
    });
  }

  getScrapReason() {}

  onChange(value: any) {
    if (this.selectedscrapReason && this.selectedscrapReason.length > 0) {
      this.is_selected = this.selectedscrapReason?.includes(value);
    }
    this.selectedscrapReason = [...this.selectedscrapReasonAll];
  }

  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initTimes() {
    return this.fb.group({
      quantity: this.fb.control('', Validators.required),
      reason: this.fb.control('', Validators.required),
      trackingId: this.generateUniqueId(),
    });
  }

  generateUniqueId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  get fa() {
    return this.scrapForm.get('scrap') as FormArray;
  }

  addGroup() {
    this.fa.push(this.initTimes());
  }

  removeGroup(i: number) {
    this.fa.removeAt(i);
    this.is_selected = false;
  }

  onSubmit() {
    this.appStorage.clear('SCANNED_INPUT_BINS');
    this.appStorage.clear('INPUT_SCAN_COUNT');
    this.appStorage.clear('OUTPUT_SCAN_COUNT');
    this.appStorage.clear('OUTPUT_SCANNED_WHEEL');
    this.appStorage.clear('PROGRESS');
    this.router.navigate(['training']);
  }

  onCancel() {
    this.scrapForm.reset();
    this.enableModalPopup = false;
  }

  noScraps() {
    this.router.navigate(['training']);
  }

  modalConfirmationToCompletePo() {
    localStorage.removeItem('isMaskingStarted');
    this.router.navigate(['/po-list']);
  }

  modalConfirmationCanelled() {
    this.onCancel();
  }
}
