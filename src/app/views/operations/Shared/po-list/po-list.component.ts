import { TemperingService } from './../../tempering/tempering.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription, timer } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { SharedService } from '../shared.service';
import { AppStorage } from 'src/app/storage.service';
import { ThisReceiver } from '@angular/compiler';
import { FqaService } from '../../fqa/fqa.service';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.scss'],
})
export class PoListComponent implements OnInit, OnDestroy {
  public title = 'Home';

  dataToProcess: any;
  ordersInProcess: any;
  inputfocus: boolean = true;

  previouslyCompletedOrders: any;

  isInProcess = false;
  token!: any;
  poList: any;
  poListProdPlan: any;
  poListCompleted: any;
  poListInProcess: any;
  clickEventsubscription!: Subscription;

  message: string = '';
  isLoading: boolean = false;
  isError: boolean = false;
  tags: any = [];
  previousPoData: any;
  machineId!: any;
  processId!: any;
  currentUser!: any;
  isStartBtn: boolean = false;
  redirectUrl: string = '';
  process_slug: string = '';
  isStartNewPO!: boolean;
  indexingLeft!: any;
  intervalSubscription!: Subscription;
  interval: Observable<number> = timer(0, 5 * 1000);

  isAssemblyNewPO: boolean = true;

  constructor(
    private helperService: HelperService,
    private _cookieService: CookieService,
    private sharedService: SharedService,
    private fqaService: FqaService,
    private router: Router,
    private appStorage: AppStorage,
    private temperingService: TemperingService
  ) {
    this.clickEventsubscription = this.helperService
      .polistPublicEvent()
      .subscribe({
        next: () => {
          this.getPoListPublic();
          this.token = '';
        },
        error: (error) => {
          console.info(error);
        },
      });
  }

  ngOnInit(): void {
    this.currentUser = this.appStorage.get('USER_DATA');
    this.previousPoData = this.appStorage.get('PREVIOUS_PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');
    const isStartNewPO = localStorage.getItem('IS_START_NEW_PO')!;
    this.isAssemblyNewPO = this.appStorage.get('IS_ASSEMBLY_NEW_PO');
    if (JSON.parse(isStartNewPO)) {
      this.isStartNewPO = JSON.parse(isStartNewPO);
    }

    const machineData = JSON.parse(localStorage.getItem('MACHINE') || '{}');
    const stationData = JSON.parse(localStorage.getItem('STATION') || '{}');

    this.process_slug = stationData.process_slug;
    if (machineData?.id) {
      this.machineId = machineData?.id;
    } else {
      this.machineId = localStorage?.getItem('MACHINE_ID');
      this.machineId = JSON?.parse(this.machineId);
    }
    this.token = this._cookieService.get('token');

    if (
      this.process_slug == 'winding' ||
      this.process_slug == 'prescan-hotpress' ||
      this.process_slug == 'hotpress' ||
      this.process_slug == 'masking' ||
      this.process_slug == 'metal-spray' ||
      this.process_slug == 'deburr-demask' ||
      this.process_slug == 'tempering' ||
      this.process_slug == 'off-line-clearing' ||
      this.process_slug == 'testing' ||
      this.process_slug == 'assembly' ||
      this.process_slug == 'fqa' ||
      this.process_slug == 'taping'
    ) {
      if (this.token != '') {
        this.intervalSubscription = this.interval.subscribe(() => {
          this.getPoList();
        });
      } else {
        this.getPoListPublic();
      }
    }
    this.getCompletedPoList();
  }

  getPoList() {
    this.sharedService
      .getPoList(this.machineId, this.processId)
      .subscribe((res: any) => {
        // this.poListCompleted = res.data
        //   .filter((ele: any) => ele.fqa_stage === 'TAPING_COMPLETED')
        //   .slice(0, 3);
        this.poListProdPlan = res.data
          .filter((ele: any) => {
            return (
              !ele.in_process &&
              (ele?.fqa_stage === '' ||
                ele?.fqa_stage === undefined ||
                ele?.fqa_stage === 'ELECTRICAL_COMPLETED')
            );
          })
          .slice(0, 3);

        this.poListInProcess = res.data
          .filter((ele: any) => {
            return ele.in_process;
          })
          .slice(0, 2);
      });
  }

  getPoListPublic() {
    this.sharedService
      .getPoListPublic(this.machineId, this.processId)
      .subscribe((res: any) => {
        this.poList = res.data;

        this.poListProdPlan = this.poList
          .filter((ele: any) => {
            return !ele.isCompleted;
          })
          .slice(0, 5);
      });
  }

  getCompletedPoList() {
    this.sharedService
      .getCompletedPoList(this.machineId)
      .subscribe((res: any) => {
        this.poListCompleted = res.data.slice(0, 3);
      });
  }

  windingstarted(data: any) {
    this.isError = false;
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        if (res && res.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          // this.setDataInLocalStorage(data);
          // if (this.currentUser.role == 'Operator' && this.isStartBtn === true) {
          //   this.router.navigate(['op/wd']);
          // } else if (this.currentUser.role == 'Operator') {
          //   this.router.navigate(['op/wd/output-carrier']);
          // } else {
          //   this.router.navigate(['op/wd']);
          // }
          if (
            this.currentUser.role == 'Operator' &&
            this.previousPoData.sach_number == data?.sach_number
          ) {
            this.appStorage.set('PREVIOUS_BATCH_SAME', true);
          }
          this.router.navigate(['op/wd']);
          this.setDataInLocalStorage(data);
        }
      });
  }

  continueWd(data: any) {
    this.setDataInLocalStorage(data);
    const lastUrl = this.appStorage.get('TEM_LAST_URL');

    if (lastUrl && lastUrl !== undefined) {
      this.router.navigate(['op/wd/' + lastUrl]);
    } else {
      if (this.currentUser.role == 'Operator') {
        this.router.navigate(['op/wd/output-carrier']);
      } else {
        this.router.navigate(['op/wd']);
      }
    }
  }

  setDataForPO(data: any) {
    localStorage.setItem(
      'PO_DATA',
      JSON.stringify({
        PO_id: data.production_order_id,
        Sach_id: data.sach_id,
        Ls_id: data.ls_id,
        PO: data.po_number,
        Sach: data.sach_number,
        PO_Quantity: data.target_quantity,
      })
    );
  }

  hotPressstarted(data: any) {
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        if (res && res.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.HotPressContinue(data);
        }
      });
  }

  HotPressContinue(data: any) {
    this.setDataInLocalStorage(data);
    const lastUrl = this.appStorage.get('TEM_LAST_URL');
    if (lastUrl && lastUrl !== undefined) {
      this.router.navigate(['op/hp/' + lastUrl]);
    } else {
      if (data.is_pre_press_required) {
        this.router.navigate(['op/hp']);
      } else {
        this.router.navigate(['op/hp/ip-carrier-scan']);
      }
    }
  }

  preScanStarted(data: any) {
    this.setDataInLocalStorage(data);
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        if (res && res.status == 'success' && res.statusCode == 200) {
          if (this.process_slug == 'prescan-hotpress') {
            this.redirectUrl = 'ip-carrier-scan-hp';
          } else if (this.process_slug == '') {
            this.redirectUrl = 'ip-carrier-scan-ma';
          }
          this.router.navigate(['op/ps/' + this.redirectUrl], {
            queryParams: {
              poId: data.production_order_id,
            },
          });
        }
      });
  }

  continuePreScan(data: any) {
    this.setDataInLocalStorage(data);
    if (this.process_slug == 'prescan-hotpress') {
      this.redirectUrl = 'ip-carrier-scan-hp';
    } else if (this.process_slug == '') {
      this.redirectUrl = 'ip-carrier-scan-ma';
    }

    this.router.navigate(['op/ps/' + this.redirectUrl], {
      queryParams: {
        poId: data.production_order_id,
      },
    });
  }

  preHeating(item: any) {
    this.router.navigate(['op/hp/pre-heating']);
  }

  preScanMaskingStarted(data: any) {
    const poId = data.poId;
    this.sharedService.getPreScanMaskingById(poId).subscribe((res: any) => {
      if (res && res.status == 'success' && res.statusCode == 200) {
        this.router.navigate(['op/ps'], {
          queryParams: {
            poId: poId,
          },
        });
      }
    });
  }

  maskingStarted(data: any) {
    this.isError = false;
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((resp: any) => {
        if (resp && resp.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.setPoDataForMasking(data);
        }
      });
  }

  maskingContinued(data: any) {
    this.setPoDataForMasking(data);
  }

  setPoDataForMasking(data: any) {
    localStorage.setItem(
      'PO_DATA',
      JSON.stringify({
        po_id: data.production_order_id,
        sach_id: data.sach_id,
        ls_id: data.ls_id,
        po: data.po_number,
        sach: data.sach_number,
        quantity: data.target_quantity,
        number_of_element_per_wheel: data.element_per_wheel,
      })
    );

    this.isInProcess = true;

    this.router.navigate(['op/ma']);
  }

  metalSprayStarted(data: any) {
    // localStorage.removeItem('IS_START_NEW_PO');

    this.isError = false;
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        if (res && res.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.setPoDataForMetalSpray(data);
        }
      });
  }

  metalSprayContinued(data: any) {
    this.setPoDataForMetalSpray(data);
  }

  setPoDataForMetalSpray(data: any) {
    localStorage.setItem(
      'PO_DATA',
      JSON.stringify({
        po_id: data.production_order_id,
        sach_id: data.sach_id,
        ls_id: data.ls_id,
        po: data.po_number,
        sach: data.sach_number,
        quantity: data.target_quantity,
      })
    );

    this.router.navigate(['op/ms']);
  }

  demaskDeburStarted(data: any) {
    this.isError = false;

    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        if (res && res.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.setPoDataForDemaskDebur(data);
        }
      });
  }

  demaskDeburContinued(data: any) {
    this.setPoDataForDemaskDebur(data);
  }

  setPoDataForDemaskDebur(data: any) {
    localStorage.setItem(
      'PO_DATA',
      JSON.stringify({
        po_id: data.production_order_id,
        sach_id: data.sach_id,
        ls_id: data.ls_id,
        po: data.po_number,
        sach: data.sach_number,
        quantity: data.target_quantity,
      })
    );

    this.router.navigate(['/op/dd']);
  }

  temperingStarted(data: any) {
    this.isError = false;
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((resp: any) => {
        if (resp && resp.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.temperingContinued(data);
        }
      });
  }

  temperingContinued(data: any) {
    this.setDataInLocalStorage(data);
    this.router.navigate(['/op/tmp']);
  }

  offlineStarted(data: any) {
    this.isError = false;
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((resp: any) => {
        if (resp && resp.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.offlineContinued(data);
        }
      });
  }

  offlineContinued(data: any) {
    this.setDataInLocalStorage(data);
    this.router.navigate(['/op/offline']);
  }

  refreshpage() {
    this.ngOnInit();
    this.router.navigate(['/po-list']);
  }

  assemblyStarted(data: any) {
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        this.appStorage.set('CURRENT_PO_ID', data.production_order_id);
        this.appStorage.set('IS_ASSEMBLY_NEW_PO', false);
        localStorage.setItem(
          'WIC_PO_DATA',
          JSON.stringify({
            po_id: data.production_order_id,
            sach_id: data.sach_id,
            ls_id: data.ls_id,
            po_number: data.po_number,
            sach_number: data.sach_number,
            target_quantity: data.target_quantity,
          })
        );
        this.router.navigate(['op/as']);
      });
  }

  assemblyContinue(data: any) {
    this.appStorage.set('CURRENT_PO_ID', data.production_order_id);

    localStorage.setItem(
      'WIC_PO_DATA',
      JSON.stringify({
        po_id: data.production_order_id,
        sach_id: data.sach_id,
        ls_id: data.ls_id,
        po_number: data.po_number,
        sach_number: data.sach_number,
        target_quantity: data.target_quantity,
      })
    );
    this.router.navigate(['op/as']);
  }

  testingStarted(data: any) {
    this.isError = false;
    this.sharedService
      .setPoInProcess(data.production_order_id, this.machineId)
      .subscribe((res: any) => {
        if (res && res.data.errorCode === 2) {
          this.isError = true;
          this.getPoList();
        } else {
          this.setPoDataForTesting(data);
        }
      });
  }

  testingContinued(data: any) {
    this.setPoDataForTesting(data);
  }

  setPoDataForTesting(data: any) {
    const poData = {
      po_id: data.production_order_id,
      sach_id: data.sach_id,
      lead_space: data.lead_space,
      ls_id: data.ls_id,
      po: data.po_number,
      sach: data.sach_number,
      quantity: data.target_quantity,
      ls: data.ls,
      box: data.box,
    };

    this.appStorage.set('PO_DATA', poData);

    this.router.navigate(['op/el']);
  }

  fqaStarted(data: any) {
    this.setDataInLocalStorage(data);
    let subProcess = this.fqaService.fqaProcessLog;
    if (data.fqa_stage == subProcess.electrical) {
      this.router.navigate(['op/fqa/boxed']);
    } else if (data.fqa_stage == subProcess.taping) {
      this.router.navigate(['op/fqa/taped']);
    } else if (data.fqa_stage == subProcess.firstMechanical) {
      this.router.navigate(['op/fqa/packing-op']);
    } else if (data.fqa_stage == subProcess.packing) {
      this.router.navigate(['op/fqa/label-scan']);
    } else if (data.fqa_stage == '') {
      this.sharedService
        .setPoInProcess(data.production_order_id, this.machineId)
        .subscribe((res: any) => {
          this.router.navigate(['op/fqa']);
        });
    }
  }

  fqaContinued(data: any) {
    this.setDataInLocalStorage(data);
    let subProcess = this.fqaService.fqaProcessLog;
    if (data.fqa_stage == subProcess.electrical) {
      this.router.navigate(['op/fqa/boxed']);
    } else if (data.fqa_stage == subProcess.taping) {
      this.router.navigate(['op/fqa/taped']);
    } else if (data.fqa_stage == subProcess.firstMechanical) {
      this.router.navigate(['op/fqa/packing-op']);
    } else if (data.fqa_stage == subProcess.packing) {
      this.router.navigate(['op/fqa/label-scan']);
    } else if (data.fqa_stage == '') {
      this.router.navigate(['op/fqa']);
    }
  }

  tapingStarted(data: any) {
    this.appStorage.set('NEXT_SACH', this.poListProdPlan[0].sach_number);
    this.setDataInLocalStorage(data);
    let subProcess = this.fqaService.fqaProcessLog;
    if (data.fqa_stage == subProcess.tapingMechanicalInProcess) {
      this.router.navigate(['op/fqa/scanned-resto-box']);
    } else if (data.fqa_stage == subProcess.tapingMechanicalCompleted) {
      this.router.navigate(['op/tp/line-clearance']);
    } else if (data.fqa_stage == subProcess.electrical) {
      this.sharedService
        .setPoInProcess(data.production_order_id, this.machineId)
        .subscribe((res: any) => {
          this.router.navigate(['op/tp']);
        });
    }
  }

  tapingContinued(data: any) {
    this.setDataInLocalStorage(data);
    let subProcess = this.fqaService.fqaProcessLog;
    if (data.fqa_stage == subProcess.tapingMechanicalInProcess) {
      this.router.navigate(['op/fqa/scanned-resto-box']);
    } else if (data.fqa_stage == subProcess.tapingMechanicalCompleted) {
      this.router.navigate(['op/tp/line-clearance']);
    } else if (data.fqa_stage == subProcess.electrical) {
      this.router.navigate(['op/tp']);
    }
  }

  setDataInLocalStorage(data: any) {
    this.appStorage.set('PO_DATA', {
      po_id: data.production_order_id,
      sach_id: data.sach_id,
      ls_id: data.ls_id,
      po_number: data.po_number,
      sach_number: data.sach_number,
      target_quantity: data.target_quantity,
      trolley_id: data.trolley_id,
    });
  }

  getClassOf(item: any, i: number) {
    if (i != 0 || this.currentUser.role != 'Operator') {
      this.isStartBtn = false;
      return 'disabled-btn';
    } else if (this.previousPoData.sach_number == item?.sach_number) {
      this.isStartBtn = true;
      return 'enable-btn';
    } else {
      return 'disabled-btn';
    }
  }

  ngOnDestroy() {
    this.intervalSubscription?.unsubscribe();
  }
}
