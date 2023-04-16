import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-tensile-strength-check',
  templateUrl: './as-tensile-strength-check.component.html',
  styleUrls: ['./as-tensile-strength-check.component.scss'],
})
export class AsTensileStrengthCheckComponent implements OnInit {
  wicPoData!: PO_DATA;
  machineId: any;
  processId: any;
  tensileaParameter: any[] = [];
  wrongSpc: number[] = [];
  minValue!: number;
  maxValue!: number;
  rangeParameter: any;

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
    this.getTensileStrengthResults();
  }

  getTensileStrengthResults() {
    this.assemblyService
      .getSPCResults(
        this.wicPoData.sach_id,
        this.processId,
        this.wicPoData.po_id,
        1
      )
      .subscribe((res: any) => {
        this.tensileaParameter = res.data.result;
        this.rangeParameter = res.data.range[0].tensile_strength;
        this.minValue = this.rangeParameter.min_value;
        this.maxValue = this.rangeParameter.max_value;
        this.failspc();
      });
  }

  failspc() {
    const checkResults = this.tensileaParameter.map((ele) => {
      return {
        sample1: ele.results.sample1,
        sample2: ele.results.sample2,
        sample3: ele.results.sample3,
        sample4: ele.results.sample4,
        sample5: ele.results.sample5,
      };
    });

    checkResults.map((ele: any) => {
      const Samples = Object.values(ele);
      Samples.map((e: any) => {
        if (this.minValue <= e && e <= this.maxValue) {
          console.info(e);
        } else {
          this.wrongSpc.push(e);
        }
      });
    });
  }

  proceed() {
    if (this.wrongSpc?.length != 0) {
      this.router.navigate(['op/as/recipe-setup']);
      this.wsService.sendNode(
        this.assemblyService.machineInterlocks.PROC_INTL_STOP_MACHINE,
        true
      );
    } else {
      this.router.navigate(['op/as/operation']);
    }
  }
}
