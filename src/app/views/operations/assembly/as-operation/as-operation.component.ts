import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-operation',
  templateUrl: './as-operation.component.html',
  styleUrls: ['./as-operation.component.scss'],
})
export class AsOperationComponent implements OnInit {
  processStarted: boolean = false;
  progress: number = 0;
  progressCuring: number = 0;
  newPOStart: boolean = false;
  tensilecheck: boolean = false;
  elementqualitycheck: boolean = false;
  leadlengthcheck: boolean = false;
  impluseTest: boolean = false;
  resinheightcheck: boolean = false;
  productappearance: boolean = false;
  wicPoData: any;
  curingPoData!: PO_DATA;

  btns = [
    { name: 'I.T', inProcess: false, failed: false, success: false },
    { name: 'T.S', inProcess: false, failed: false, success: false },
    // { name: 'E.Q', inProcess: false, failed: false, success: true },
    // { name: 'L.L', inProcess: false, failed: false, success: false },
  ];
  elementTarget: any;
  machinePartBatchCount: number = 0;
  machineCuringPartBatchCount: number = 0;
  poData: any;
  spcSchedule: any;
  impluseTestForSampleCount: number = 0;
  machineId!: any | null;
  processId: any;
  isLoadRecipe: boolean = false;
  isLoadRecipeCuring: boolean = false;
  isBatchCompleted: boolean = false;
  temCuringPoData!: PO_DATA;
  isEmptyLeadWire: boolean = false;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private assemblyService: AssemblyService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');
    const btnsCheck = this.appStorage.get('BTNS_QUALITY_CHECK');
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
    this.spcSchedule = this.appStorage.get('TEM_SPC_SCHEDULE');

    if (btnsCheck && btnsCheck != null) {
      this.btns = btnsCheck;
    }

    this.elementTarget = this.wicPoData.target_quantity;
    this.wsService.machineCuringPartBatchCount.subscribe({
      next: (value: number) => {
        this.machineCuringPartBatchCount = value;
        if (
          this.machineCuringPartBatchCount != null &&
          this.machineCuringPartBatchCount != 0
        ) {
          this.processStarted = true;
          this.resinheightcheck = false;
          this.productappearance = false;

          const partsProgress =
            this.machineCuringPartBatchCount /
            parseInt(this.wicPoData.target_quantity);
          this.progressCuring = Math.round(partsProgress * 100);

          if (this.progress == this.spcSchedule[0]) {
            this.resinheightcheck = true;
          } else if (
            this.machineCuringPartBatchCount % this.spcSchedule[0] === 20 ||
            (this.machineCuringPartBatchCount % this.spcSchedule[1] === 0 &&
              this.machineCuringPartBatchCount != null)
          ) {
            this.productappearance = true;
          }
        }
      },
    });

    this.wsService.alarms.subscribe({
      next: (values: any) => {
        const alarms = values;
        alarms.forEach((ele: any) => {
          if (ele.alarm === 'alarm_code_12' || ele.alarm === 'alarm_code_13') {
            this.isEmptyLeadWire = true;
          }
        });
      },
    });

    this.wsService.alarmsCuring.subscribe({
      next: (values: any) => {
        const alarms = values;

        // For Assembly
        alarms.forEach((ele: any) => {
          if (ele.name === 'alarm_code_37') {
            this.wsService.sendNodeForCuring(
              this.assemblyService.machineInterlocks.ALLOW_EMPTY_BAR,
              true
            );
          } else if (ele.name === 'alarm_code_56') {
            this.isLoadRecipe = true;
            this.wsService.sendNodeForCuring(
              this.assemblyService.machineInterlocks.ALLOW_EMPTY_BAR,
              false
            );
          } else if (
            this.elementTarget - this.machineCuringPartBatchCount < 200 &&
            ele.name === 'alarm_code_55'
          ) {
            this.wsService.sendNodeForCuring(
              this.assemblyService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
              true
            );
            this.isBatchCompleted = true;
            this.appStorage.set('CURING_PO_DATA', {
              po_id: this.temCuringPoData.po_id,
              sach_id: this.temCuringPoData.sach_id,
              ls_id: this.temCuringPoData.ls_id,
              po_number: this.temCuringPoData.po_number,
              sach_number: this.temCuringPoData.sach_number,
              target_quantity: this.temCuringPoData.target_quantity,
            });
            this.curingPoData = this.temCuringPoData;
            setTimeout(() => {
              this.wsService.sendNodeForCuring(
                this.assemblyService.machineInterlocks
                  .PROC_INTL_BATCH_COMPLETED,
                false
              );
            }, 1000);
          }
        });
      },
    });

    this.wsService.machinePartsBatchCount.subscribe({
      next: (value: number) => {
        this.machinePartBatchCount = value;

        if (
          this.machinePartBatchCount != null &&
          this.machinePartBatchCount != 0
        ) {
          const partsProgress =
            this.machinePartBatchCount /
            parseInt(this.wicPoData.target_quantity);
          this.progress = Math.round(partsProgress * 100);

          if (
            this.machinePartBatchCount != 0 &&
            this.machinePartBatchCount != null
          ) {
            this.processStarted = true;
          }

          if (this.progress == this.spcSchedule[0]) {
            this.impluseTest = true;
          } else if (this.machinePartBatchCount == this.elementTarget / 2) {
            this.tensilecheck = true;
          } else if (
            this.machinePartBatchCount % this.spcSchedule[0] === 40 ||
            (this.machinePartBatchCount % this.spcSchedule[1] === 40 &&
              this.machinePartBatchCount != null)
          ) {
            this.leadlengthcheck = true;
          } else if (
            this.machinePartBatchCount === this.spcSchedule[0] + 20 ||
            (this.machinePartBatchCount % this.spcSchedule[1] === 0 &&
              this.machinePartBatchCount != null)
          ) {
            this.elementqualitycheck = true;
          } else if (this.progress == 100) {
            this.newPOStart = true;
            this.sendInterlocksForAssembly();
          }
        }
      },
      error: (error) => {
        console.info(error);
      },
    });

    this.wsService.feedFinishMode.subscribe((value: any) => {
      if (this.machinePartBatchCount < 50 && value === true) {
        this.isLoadRecipeCuring = true;
        this.appStorage.set('TEM_CURING_PO_DATA', {
          po_id: this.wicPoData.po_id,
          sach_id: this.wicPoData.sach_id,
          ls_id: this.wicPoData.ls_id,
          po_number: this.wicPoData.po_number,
          sach_number: this.wicPoData.sach_number,
          target_quantity: this.wicPoData.target_quantity,
        });
        this.temCuringPoData = this.wicPoData;
      }
    });
  }

  startTheProcess() {
    this.processStarted = true;
  }

  // incrementTheProgress() {
  //   this.progress += 5;
  //   this.tensilecheck = false;
  //   // this.impluseTest = false;
  //   this.leadlengthcheck = false;
  //   this.elementqualitycheck = false;
  //   if (this.progress == 20) {
  //     localStorage.setItem(
  //       'CURING_PO_DATA',
  //       JSON.stringify({
  //         po_id: this.wicPoData.po_id,
  //         sach_id: this.wicPoData.sach_id,
  //         ls_id: this.wicPoData.ls_id,
  //         po_number: this.wicPoData.po_number,
  //         sach_number: this.wicPoData.sach_number,
  //         target_quantity: this.wicPoData.target_quantity,
  //       })
  //     );
  //     this.curingPoData = this.wicPoData;
  //     this.incrementProgressForCuring();
  //   }
  //   if (this.progress == 10) {
  //     // this.impluseTest = true;
  //   } else if (this.progress == 15) {
  //     this.elementqualitycheck = true;
  //   } else if (this.progress == 20) {
  //     this.leadlengthcheck = true;
  //   } else if (this.progress == 50) {
  //     this.tensilecheck = true;
  //   } else if (this.progress == 100) {
  //     this.newPOStart = true;
  //     this.sendInterlocksForAssembly();
  //   }
  // }

  // incrementProgressForCuring() {
  //   this.progressCuring += 5;
  //   this.resinheightcheck = false;
  //   this.productappearance = false;
  //   if (this.progressCuring == 15 || this.progressCuring == 50) {
  //     this.resinheightcheck = true;
  //   } else if (this.progressCuring == 20) {
  //     this.productappearance = true;
  //   }
  // }

  scanTrays() {
    this.router.navigate(['op/as/metal-trays']);
  }

  scanCanBox() {
    this.router.navigate(['op/as/material-check']);
    this.appStorage.set('IS_SCAN_CAN_BOX', true);
  }

  scanLeadWire() {
    this.router.navigate(['op/as/lead-wire-scanning']);
    this.appStorage.set('IS_SCAN_LEAD_WIRE', true);
  }

  continueNewPO() {
    this.router.navigate(['/po-list']);
    this.appStorage.clear('WIC_PO_DATA');
    this.appStorage.set('IS_ASSEMBLY_NEW_PO', true);
  }

  sendInterlocksForAssembly() {
    this.appStorage.set('MACHINE_PART_COUNT', this.machinePartBatchCount);
    this.wsService.sendNode(
      this.assemblyService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      true
    );
    this.wsService.sendNode(
      this.assemblyService.machineInterlocks.BATCH_PRODUCTION_START_ON_MACHINE,
      false
    );
    this.wsService.sendNode(
      this.assemblyService.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
      true
    );
  }

  sendInterlocksForCuring() {}

  ProceedForImpluseTest() {
    this.tensilecheck = true;
    this.wsService.sendNode(
      this.assemblyService.machineInterlocks.IMPLUSE_TEST_SAMPLE,
      true
    );

    this.impluseTestForSampleCount = this.machinePartBatchCount;

    if (this.machinePartBatchCount - this.impluseTestForSampleCount === 9) {
      this.wsService.sendNode(
        this.assemblyService.machineInterlocks.IMPLUSE_TEST_SAMPLE,
        false
      );
    }

    const name = 'I.T';
    this.btns = this.btns.map((ele: any) => {
      if (name == ele.name) {
        ele.inProcess = true;
      }
      return ele;
    });
    this.appStorage.set('BTNS_QUALITY_CHECK', this.btns);
  }
  ProceedForTensileTest() {
    this.tensilecheck = false;
    const name = 'T.S';
    this.btns = this.btns.map((ele: any) => {
      if (name == ele.name) {
        ele.inProcess = true;
      }
      return ele;
    });
    this.appStorage.set('BTNS_QUALITY_CHECK', this.btns);
  }

  btnClick(name: any) {
    if (name == 'I.T') {
      this.proceedImpulseTest();
    } else if (name == 'T.S') {
      this.proceedTensile();
    } else if (name == 'E.Q') {
      this.proceedVisualInspection();
    } else if (name == 'L.L') {
      this.proceedLeadLengthCheck();
    }
  }

  proceedTensile() {
    this.router.navigate(['op/as/tensile-strength-quality-check']);
  }
  proceedImpulseTest() {
    this.router.navigate(['op/as/impulse-test']);
  }

  proceedVisualInspection() {
    this.router.navigate(['op/as/process-quality-check']);
  }

  proceedLeadLengthCheck() {
    this.router.navigate(['op/as/lead-length-check']);
  }

  proceedresinHeightCheck() {
    this.router.navigate(['op/as/resin-height-check']);
  }

  proceedForProductAppearance() {
    this.router.navigate(['op/as/product-appearance']);
  }

  replaceOutputCarrier() {
    this.router.navigate(['op/as/output-carrier']);
    this.createJob();
  }

  checkOutProcess() {
    this.appStorage.set('CURING_PO_DATA', {
      po_id: this.temCuringPoData.po_id,
      sach_id: this.temCuringPoData.sach_id,
      ls_id: this.temCuringPoData.ls_id,
      po_number: this.temCuringPoData.po_number,
      sach_number: this.temCuringPoData.sach_number,
      target_quantity: this.temCuringPoData.target_quantity,
    });
    this.router.navigate(['op/as/label-printing']);
  }

  createJob() {
    this.temCuringPoData = this.appStorage.get('TEM_CURING_PO_DATA');
    const reqBody = {
      machine_id: this.machineId,
      process_id: this.processId,
      po_id:
        this.temCuringPoData != null
          ? this.temCuringPoData.po_id
          : this.wicPoData.po_id,
      type_id: 4,
    };
    this.assemblyService.job(reqBody).subscribe((res: any) => {
      this.appStorage.set('SCANNING_JOB_ID', res.data[0].id);
    });
  }

  loadRecipe() {
    this.isLoadRecipe = false;
    this.router.navigate(['op/as/dispenser-recipe-setup']);
  }
  loadRecipeCuring() {
    this.isLoadRecipeCuring = false;
    this.router.navigate(['op/as/curing-recipe-setup']);
  }
}
