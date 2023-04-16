import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { WindingService } from '../../winding/winding.service';
import { PO_DATA } from '../shared-model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-scrap-booking',
  templateUrl: './scrap-booking.component.html',
  styleUrls: ['./scrap-booking.component.scss'],
})
export class ScrapBookingComponent implements OnInit {
  // @Input() printlabel!: boolean;
  // @Output() scrapSetup = new EventEmitter();
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: any;
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  poData!: PO_DATA;
  clickEventFromOfflinePrePress!: Subscription;
  scrapForOfflinePrePress: boolean = false;
  offline_pre_press: boolean = false;
  is_poList: boolean = false;
  machineId: any;
  noScrap: boolean = false;
  isScrapSubmitted: boolean = false;
  processId: any;
  currentUser!: any;
  setUpScrap: number = 0;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private windingService: WindingService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit() {
    this.windingService.sentClickEventpoStageCompleted('scrap-booking');
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const currentUser = localStorage.getItem('USER_DATA')!;
    this.currentUser = JSON.parse(currentUser);

    this.setUpScrap = this.appStorage.get('TEM_SETUP_SCRAP');

    this.getScrapReason();
    this.getScrapFormData();
  }

  getScrapFormData() {
    // we will initialize our form here
    this.scrapForm = this.fb.group({
      scrap: this.fb.array([this.initTimes()]),
    });
    this.fa.valueChanges.subscribe((value) => {
      this.selectedscrapReasonAll = value.map((v: any) => v.reason);
    });
  }
  getScrapReason() {
    this.sharedService.getScrapReasons(this.processId).subscribe((res: any) => {
      if (this.currentUser.role !== 'Operator') {
        this.scrapReason = res.data.filter(
          (e: any) => e.reason_text === 'Set-Up scrap'
        );
      } else {
        this.scrapReason = res.data;
      }
    });
  }

  onChange(value: any) {
    if (this.selectedscrapReason && this.selectedscrapReason.length > 0) {
      this.is_selected = this.selectedscrapReason?.includes(value);
    }
    this.selectedscrapReason = [...this.selectedscrapReasonAll];
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
    const scrap = this.scrapForm.value.scrap;

    const req = scrap.map((ele: any) => {
      return {
        scrap_id: +ele.reason,
        scrap_quantity: ele.quantity,
      };
    });
    const reqSt = scrap.map((ele: any) => {
      return {
        scrap_id:
          this.currentUser.role == 'Setter'
            ? this.scrapReason[0].id
            : +ele.reason,
        scrap_quantity: ele.quantity,
      };
    });
    // var scrapType = 0;
    // if (this.currentUser.role != 'Setter') {
    //   scrapType = 1;
    // } else {
    //   scrapType = 2;
    // }
    const reqObj = {
      scrap_reasons: this.currentUser.role == 'Setter' ? reqSt : req,
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: this.currentUser.role == 'Setter' ? 1 : 2,
    };

    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {
      if (this.currentUser.role == 'Operator') {
        this.wsService.sendNode(
          this.windingService.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
          false
        );
        this.poCheckOut();

        this.router.navigate(['/po-list']);
      } else {
        this.router.navigate(['op/wd/logout']);
      }
    });
  }

  onCancel() {
    this.scrapForm.reset();
  }
  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }
  noScraps() {
    if (this.currentUser.role == 'Operator') {
      this.wsService.sendNode(
        this.windingService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
        false
      );
      this.wsService.sendNode(
        this.windingService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        true
      );
      this.poCheckOut();
      this.router.navigate(['/po-list']);
    } else {
      this.router.navigate(['op/wd/logout']);
    }
  }

  modalConfirmationToCompletePo() {
    // this.windingService
    //   .completeCheckout(
    //     this.machineId,
    //     this.poData?.po_id,
    //     this.poData?.Sach_id
    //   )
    //   .subscribe();
    // this.windingService
    //   .completePo(this.machineId, this.poData?.po_id)
    //   .subscribe();
    // this.router.navigate(['/po-list']);
  }

  poCheckOut() {
    this.sharedService
      .poCheckOut(this.processId, this.machineId, this.poData.po_id)
      .subscribe({
        next: (res: any) => {
          this.appStorage.clear('TEM_LAST_URL');
          this.appStorage.clear('TEM_SPC_SCHEDULE');
        },
      });
  }
}
