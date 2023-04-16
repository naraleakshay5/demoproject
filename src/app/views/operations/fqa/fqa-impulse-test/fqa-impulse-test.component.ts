import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';
import { AssemblyService } from '../../assembly/assembly.service';
import { PO_DATA } from '../../Shared/shared-model';
import { FqaService } from '../fqa.service';

@Component({
  selector: 'app-fqa-impulse-test',
  templateUrl: './fqa-impulse-test.component.html',
  styleUrls: ['./fqa-impulse-test.component.scss'],
})
export class FqaImpulseTestComponent implements OnInit {
  poData!: PO_DATA;
  machineId: any;
  processId: any;
  Parameter: any[] = [];
  afterImpulseResult: any[] = [];
  beforeImpulseResult: any[] = [];
  wrongSpc: number[] = [];

  highLimit: any;
  lowLimit: any;
  c_1khz: any;
  d_1khz: any;
  d_10khz: any;

  minValue!: number;
  maxValue!: number;

  columns = ['C% 1KHz', 'TanD 1KHz', 'TanD 10KHz', 'TanD 100KHz'];
  records: any = [];
  beforeImpulseTestParameter: any;
  afterImpulseTestParameter: any;
  testingType!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private assemblyService: AssemblyService,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);

    this.getResult();
    // this.getBeforeImpulseResult();
    this.getAfterImpulseResult();

    this.route.queryParams.subscribe((params: any) => {
      this.testingType = params.type;
    });
  }

  getResult() {
    this.fqaService.getResult().subscribe((res: any) => {
      this.highLimit = res.setup[8].__EMPTY_6;
      this.lowLimit = res.setup[9].__EMPTY_6;
      this.d_1khz = res.setup[17].__EMPTY_6;
      this.d_10khz = res.setup[18].__EMPTY_6;

      this.beforeImpulseResult = res.data.map((ele: any) => {
        return {
          cap_no: ele['Cap.No. '],
          current: ele['Current '],
          dc: ele['DC      '],
          c_1khz: ele['C.  1kHz'],
          d_10khz: ele['D. 10kHz'],
          d_1khz: ele['D.  1kHz'],
          d_100khz: ele['D.100kHz'],
        };
      });
    });
  }

  getBeforeImpulseResult() {
    this.assemblyService
      .getSPCResults(this.poData.sach_id, this.processId, this.poData.po_id, 2)
      .subscribe((res: any) => {
        this.beforeImpulseResult = res.data.result;
        this.beforeImpulseTestParameter =
          res.data.range[0]?.impulse_test_parameters;

        this.Parameter = res.data.result;
      });
  }

  getAfterImpulseResult() {
    this.assemblyService
      .getSPCResults(this.poData.sach_id, this.processId, this.poData.po_id, 3)
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
    if (this.testingType == 'manul') {
      this.router.navigate(['op/fqa/ir-test']);
    } else {
      this.router.navigate(['op/fqa/fqa-po-checkout']);
      localStorage.setItem(
        'INSPECTORTYPE',
        this.fqaService.fqaProcessLog.electrical
      );
    }
  }
}
