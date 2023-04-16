import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-impulse-test',
  templateUrl: './as-impulse-test.component.html',
  styleUrls: ['./as-impulse-test.component.scss'],
})
export class AsImpulseTestComponent implements OnInit {
  wicPoData!: PO_DATA;
  machineId: any;
  processId: any;
  Parameter: any[] = [];
  afterImpulseResult: any[] = [];
  beforeImpulseResult: any[] = [];
  wrongSpc: number[] = [];

  minValue!: number;
  maxValue!: number;

  columns = ['C% 1KHz', 'TanD 1KHz', 'TanD 10KHz', 'TanD 100KHz'];
  records: any = [];
  beforeImpulseTestParameter: any;
  afterImpulseTestParameter: any;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private wsService: WebsocketService,
    private assemblyService: AssemblyService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getBeforeImpulseResult();
    this.getAfterImpulseResult();
  }

  getBeforeImpulseResult() {
    this.assemblyService
      .getSPCResults(
        this.wicPoData.sach_id,
        this.processId,
        this.wicPoData.po_id,
        2
      )
      .subscribe((res: any) => {
        this.beforeImpulseResult = res.data.result;
        this.beforeImpulseTestParameter =
          res.data.range[0]?.impulse_test_parameters;

        this.Parameter = res.data.result;
      });
  }

  getAfterImpulseResult() {
    this.assemblyService
      .getSPCResults(
        this.wicPoData.sach_id,
        this.processId,
        this.wicPoData.po_id,
        3
      )
      .subscribe((res: any) => {
        this.afterImpulseResult = res.data.result;
        this.afterImpulseTestParameter =
          res.data.range[0]?.impulse_test_parameters;
      });
  }

  getClassOf(val: any, parameter: any) {
    if (
      val >= this.afterImpulseTestParameter?.lowLmt &&
      val <= this.afterImpulseTestParameter?.highLmt &&
      parameter === 'C% 1KHz'
    ) {
      return 'sample_ok';
    } else if (
      val >= this.afterImpulseTestParameter?.lowLmt &&
      val <= this.afterImpulseTestParameter?.highLmt &&
      parameter === 'C% 1KHz'
    ) {
      return 'sample_not_ok';
    } else if (
      val <= this.afterImpulseTestParameter?.TanD1khz &&
      parameter === 'TanD 1KHz'
    ) {
      return 'sample_ok';
    } else if (
      val >= this.afterImpulseTestParameter?.TanD1khz &&
      parameter === 'TanD 1KHz'
    ) {
      return 'sample_not_ok';
    } else if (
      val <= this.afterImpulseTestParameter?.TanD10khz &&
      parameter === 'TanD 10KHz'
    ) {
      return 'sample_ok';
    } else if (
      val >= this.afterImpulseTestParameter?.TanD10khz &&
      parameter === 'TanD 10KHz'
    ) {
      return 'sample_not_ok';
    } else if (
      val <= this.afterImpulseTestParameter?.TanD100khz &&
      parameter === 'TanD 100KHz'
    ) {
      return 'sample_ok';
    } else if (
      val >= this.afterImpulseTestParameter?.TanD100khz &&
      parameter === 'TanD 100KHz'
    ) {
      return 'sample_not_ok';
    } else {
      return 'sample_not_ok';
    }
  }
  getValue(val: any, parameter: any) {
    if (
      this.afterImpulseTestParameter?.lowLmt <= val &&
      val <= this.afterImpulseTestParameter?.highLmt &&
      parameter === 'C% 1KHz'
    ) {
      return 'P';
    } else if (
      this.afterImpulseTestParameter?.lowLmt >= val &&
      val <= this.afterImpulseTestParameter?.highLmt &&
      parameter === 'C% 1KHz'
    ) {
      return 'F';
    } else if (
      val <= this.afterImpulseTestParameter?.TanD1khz &&
      parameter === 'TanD 1KHz'
    ) {
      return 'P';
    } else if (
      val >= this.afterImpulseTestParameter?.TanD1khz &&
      parameter === 'TanD 1KHz'
    ) {
      return 'F';
    } else if (
      val <= this.afterImpulseTestParameter?.TanD10khz &&
      parameter === 'TanD 10KHz'
    ) {
      return 'P';
    } else if (
      val >= this.afterImpulseTestParameter?.TanD10khz &&
      parameter === 'TanD 10KHz'
    ) {
      return 'F';
    } else if (
      val <= this.afterImpulseTestParameter?.TanD100khz &&
      parameter === 'TanD 100KHz'
    ) {
      return 'P';
    } else if (
      val >= this.afterImpulseTestParameter?.TanD100khz &&
      parameter === 'TanD 100KHz'
    ) {
      return 'F';
    } else {
      return 'F';
    }
  }

  proceed() {
    this.router.navigate(['op/as/operation']);
  }
}
