import { SharedService } from './../../Shared/shared.service';
import { MaskingService } from './../masking.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { PoData } from '../../Shared/shared-model';

@Component({
  selector: 'app-ma-masking',
  templateUrl: './ma-masking.component.html',
  styleUrls: ['./ma-masking.component.scss'],
})
export class MaMaskingComponent implements OnInit, OnDestroy {
  isProceeded: boolean = false;
  processStarted: boolean = false;
  enableProgressStatus: boolean = false;
  progress: number = 0;
  enableMajorRework: boolean = false;
  enableMinorRework: boolean = false;
  enableReworkModal: boolean = false;
  poData!: PoData;
  machineId!: number;
  enableInProcessQualityCheckModal: boolean = false;
  elementCount: number | null = 0;
  totalWheelsCount!: number;
  currentWheelCount!: number;

  elementsProcessed!: number;
  wheelCompleted: boolean = false;
  remainingElements!: number;
  proceedToSPCBtn: boolean = false;
  enableWheelRemovalModal: boolean = false;
  processId!: number;
  wheelDetails: any;
  spcType!: string;
  spcElementCount!: number;
  newAddedWheel!: number;
  wheelOperationType: any;

  constructor(
    private router: Router,
    private maskingService: MaskingService,
    private sharedService: SharedService,
    private wsService: WebsocketService
  ) {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
  }

  ngOnDestroy() {
    this.wsService.wheelCount.unsubscribe();
  }

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const newAddedWheel = localStorage.getItem('NEWLY_ADDED_WHEEL')!;
    if (JSON.parse(newAddedWheel)) {
      this.newAddedWheel = JSON.parse(newAddedWheel);
    }

    const wheelOperationType = localStorage.getItem('WHEEL_OPERATION_TYPE')!;
    if (JSON.parse(wheelOperationType)) {
      this.wheelOperationType = JSON.parse(wheelOperationType);
    }

    const numberOfWheels =
      this.poData?.quantity / this.poData?.number_of_element_per_wheel;

    this.maskingService.totalWheelsCount = Math.ceil(numberOfWheels);

    this.getSpcCallSchdule();

    this.getWheelDetails();

    this.maskingProcess();
  }

  maskingProcess() {
    this.wheelCompleted = this.maskingService.wheelCompleted;

    this.wsService.wheelCount.subscribe({
      next: (value: any) => {
        this.currentWheelCount = value;
        //kept for observation

        if (!this.sharedService.currentWheel) {
          this.sharedService.currentWheel = value;
          localStorage.setItem('isMaskingStarted', 'true');
        }

        if (
          this.sharedService.currentWheel &&
          this.sharedService.currentWheel != value
        ) {
          this.sharedService.currentWheel = value;

          this.wheelCompleted = true;

          this.wsService.sendNode(
            this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
            true
          );

          const wheelOperationType = this.wheelOperationType.filter(
            (ele: any) => ele.opeartion_name == 'Wheel_Operation_Started'
          );

          this.maskingService
            .wheelLogOperation(
              this.poData?.po_id,
              this.newAddedWheel,
              wheelOperationType[0]?.wheel_operation_id
            )
            .subscribe((resp: any) => {});
        }
      },
    });

    this.wsService.machinePartsBatchCount.subscribe({
      next: (value: number) => {
        this.elementsProcessed = value;
        this.elementCount = value;
        this.remainingElements = this.poData?.quantity - this.elementsProcessed;

        const partsProgress = this.elementCount / this.poData?.quantity;
        this.progress = Math.round(partsProgress * 100);

        if (this.spcElementCount && this.elementCount >= this.spcElementCount) {
          this.proceedToSPCBtn = true;
        }

        if (this.progress >= 99) {
          this.wheelCompleted = true;
          // kept for use
          // this.progress = 0;
          // this.wsService.sendNode(
          //   this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
          //   false
          // );
        }
      },
    });
  }

  getSpcCallSchdule() {
    this.sharedService
      .getSpcCallSchdule(this.processId)
      .subscribe((resp: any) => {
        this.spcType = resp.data[0].spc_type;
        this.spcElementCount = resp.data[0].element_count;
      });
  }

  doSpcCheck() {
    this.maskingService
      .doSpcCheck(
        this.processId,
        this.poData?.po_id,
        this.spcType,
        this.spcElementCount
      )
      .subscribe((resp: any) => {
        this.spcElementCount = resp.data[0].element_count;
        this.spcType = resp.data[0].spc_type;
        this.proceedToSPCBtn = false;
      });
  }

  getWheelDetails() {
    this.maskingService
      .getWheelDetails(this.processId, this.poData?.po_id)
      .subscribe((resp: any) => {
        const length = resp.data.length;
        this.wheelDetails = resp.data[length - 1];
      });
  }

  proceedToMasking() {
    this.isProceeded = true;
  }

  startTheProcess() {
    this.processStarted = true;
    this.enableProgressStatus = true;
    this.wsService.sendNode(
      this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      false
    );
  }

  incrementTheProgress() {
    // this.progress += 10;
  }

  inProcessQualityCheck() {
    this.enableInProcessQualityCheckModal = true;
  }

  additionalWheelsToBeAdded() {
    if (
      this.maskingService.currentWheelCount ==
      this.maskingService.totalWheelsCount
    ) {
      this.noWheelsToBeProcessed();
    } else {
      this.wheelCompleted = false;
      this.wsService.sendNode(
        this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        false
      );
      this.router.navigate(['op/ma/output-carrier-scan']);
    }
  }

  noWheelsToBeProcessed() {
    this.sharedService.sentClickEventpoStageCompleted('masking');
    this.maskingService.wheelCompleted = false;
    this.router.navigate(['op/ma/label-printing']);
  }

  modalConfirmed() {
    this.enableInProcessQualityCheckModal = false;
    this.doSpcCheck();
  }

  modalToRework() {
    this.enableInProcessQualityCheckModal = false;
    this.enableReworkModal = true;
  }

  reworkModalConfirmed(rework: any) {
    if (rework == 'major') {
      this.enableMajorRework = true;
    } else {
      this.enableMinorRework = true;
    }
    this.enableReworkModal = false;
  }

  modalCancelled() {
    this.enableInProcessQualityCheckModal = false;
  }

  reworkModalCanceled() {
    this.enableReworkModal = false;
  }

  majorReworkModalConfirmed() {
    this.enableMajorRework = false;
    localStorage.setItem('IS_REWORK', 'true');
    this.doSpcCheck();
    this.dissasociateWheel();
    this.enableWheelRemovalModal = true;
  }

  dissasociateWheel() {
    const wheelOperationType = this.wheelOperationType.filter(
      (ele: any) => ele.opeartion_name == 'Wheel_Disassociated'
    );
    this.maskingService
      .wheelLogOperation(
        this.poData?.po_id,
        this.newAddedWheel,
        wheelOperationType[0]?.wheel_operation_id
      )
      .subscribe((resp: any) => {});
  }

  minorReworkModalConfirmed() {
    this.enableMinorRework = false;
    this.doSpcCheck();
  }

  wheelRemovalModalConfirmed() {
    this.maskingService
      .disassociateWheel(
        this.machineId,
        this.poData?.po_id,
        this.processId,
        this.wheelDetails?.id
      )
      .subscribe((resp: any) => {
        this.router.navigate(['op/ma/machine-setup']);
      });
  }
}
