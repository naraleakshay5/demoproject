import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/websocket.service';
import { AppStorage } from 'src/app/storage.service';
import { HotPressService } from '../../../operations/hot-press/hot-press.service';
import { SharedService } from '../../../../views/operations/Shared/shared.service';
import { reason } from 'src/app/views/operations/hot-press/hot-press-model';
import { PO_DATA } from 'src/app/views/operations/Shared/shared-model';
@Component({
  selector: 'app-scrapbooking',
  templateUrl: './scrap-booking.component.html',
  styleUrls: ['./scrap-booking.component.scss'],
})
export class ScrapBookingComponent implements OnInit {
  processId!: any;
  scrapForm!: FormGroup;
  scrap!: FormArray;
  scrapReason: reason[] = [];
  selectedscrapReason: any[] = [];
  selectedscrapReasonAll: any[] = [];
  is_selected: boolean = false;
  poData!: PO_DATA;
  machineId: any | null;
  currentUser!: any;
  clickEventFromOfflinePrePress!: Subscription;
  scrapForOfflinePrePress: boolean = false;
  currentUrl: string;
  offline_pre_press: boolean = false;
  is_poList: boolean = false;
  noScrap: boolean = false;
  operationalsLogs: any[] = [];
  completPo: any[] = [];
  reason: any = [
    {
      id: 1,
      name: 'Bad press element',
    },
    {
      id: 2,
      name: 'Concave element',
    },
    {
      id: 3,
      name: 'Open element',
    },
    {
      id: 4,
      name: 'Burnt elements',
    },
    {
      id: 5,
      name: 'Joined elements',
    },
    {
      id: 6,
      name: 'Hard-pressed elements',
    },
    {
      id: 7,
      name: ' Missing quantity',
    },
  ];
  constructor(
    private sharedService: SharedService,
    private hotPressService: HotPressService,
    private fb: FormBuilder,
    private router: Router,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);

    if (this.currentUrl.split('/')[3] == 'offline-pre-press') {
      this.offline_pre_press = true;
    } else if (
      this.currentUrl.split('/')[3] == 'scrap-booking' &&
      this.currentUrl.split('/')[3] == 'hot-press'
    ) {
      this.is_poList = true;
    }
  }

  ngOnInit(): void {
    this.appStorage.set('TEM_LAST_URL', 'scrap-booking');
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    this.currentUser = this.appStorage.get('USER_DATA');

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
    // this.sharedService.getScrapReasons(this.processId).subscribe((res: any) => {
    //   this.scrapReason = res.data;
    // });
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
    // this.router.navigate(['training/hot-press/ip-carrier-scan']);
    const scrap = this.scrapForm.value.scrap;

    const req = scrap.map((ele: any) => {
      return {
        scrap_id: +ele.reason,
        scrap_quantity: ele.quantity,
      };
    });
    var scrapType = 2;
    const reqObj = {
      scrap_reasons: req,
      //production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      scrap_type: scrapType,
    };

    this.noScraps();
    this.sharedService.postScrapReasons(reqObj).subscribe((res: any) => {});
  }

  onCheck(event: any) {
    this.noScrap = event.target.checked;
  }

  noScraps() {
    //this.router.navigate(['training/hot-press/ip-carrier-scan']);
    if (this.offline_pre_press) {
      this.offline_pre_press = false;
      this.router.navigate(['training/hot-press/ip-carrier-scan']);
    } else {
      const po = this.appStorage.get('TEM_STARTED_POS');
      //alert('open preHiting');
      //this.router.navigate(['/training/hot-press/hotPress']);
      console.log(po);

      if (po[0].isComplated === false) {
        alert('go');
        po.filter((ele: any) => ele.isStart === false);
        po.filter((ele: any) => ele.isComplated === true);
      }

      this.poData = po.forEach((ele: any) => {
        if (this.poData.po_number == po.po_number) {
          alert('done');
          ele.isStart == false;
          ele.isComplated == true;
          //console.log(po);
          //console.log(this.poData);
          this.poData = po.filter((ele: any) => ele.isStart === false);
          this.poData = po.filter((ele: any) => ele.isComplated === true);
          //console.log(this.poData);
        }
        return ele;
      });
      this.appStorage.clear('TEM_INPUT_SCANNED_BIN');
      this.appStorage.clear('TEM_SCAN_INPUT_BIN');
      this.appStorage.clear('TEM_LAST_URL');
      this.router.navigate(['/training/hot-press/hotPress']);
    }
  }
}
