import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';
import { FqaService } from '../../fqa.service';

@Component({
  selector: 'app-fqa-pitch-measurement',
  templateUrl: './fqa-pitch-measurement.component.html',
  styleUrls: ['./fqa-pitch-measurement.component.scss'],
})
export class FqaPitchMeasurementComponent implements OnInit {
  poData!: PO_DATA;
  machineId: any;
  processId: any;
  visualInspect: any[] = [];
  radioSelvisualInspectSample1: any;
  radioSelvisualInspectSample2: any;
  allradioSelvisualInspectSample1: any;
  allradioSelvisualInspectSample2: any;
  disabledBtn: boolean = false;
  isAllSampleCorrect: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.machineId = localStorage.getItem('MACHINE_ID');
    this.machineId = JSON.parse(this.machineId);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    this.getSpcvisualInspect();
  }

  getSpcvisualInspect() {
    const type = 'pitch';
    this.sharedService
      .getSpcvisualInspect(this.processId, type)
      .subscribe((resp: any) => {
        this.visualInspect = resp.data.map((key: any) => ({
          ...key,
          is_sample_1_ok: false,
          is_sample_1_not_ok: false,
          is_sample_2_ok: false,
          is_sample_2_not_ok: false,
        }));
      });
  }

  onItemChange(event: any) {
    let value = event.target.value;

    this.visualInspect = this.visualInspect.map(
      (record: any, index: number) => {
        if (
          value.split('_')[0] == 'oksample1' &&
          value.split('_')[1] == index
        ) {
          record.sample1 = true;
          record.is_sample_1_ok = true;
          record.is_sample_1_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample1' &&
          value.split('_')[1] == index
        ) {
          record.sample1 = false;
          record.is_sample_1_not_ok = true;
          record.is_sample_1_ok = false;
        } else if (
          value.split('_')[0] == 'oksample2' &&
          value.split('_')[1] == index
        ) {
          record.sample2 = true;
          record.is_sample_2_ok = true;
          record.is_sample_2_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample2' &&
          value.split('_')[1] == index
        ) {
          record.sample2 = false;
          record.is_sample_2_not_ok = true;
          record.is_sample_2_ok = false;
        }
        return record;
      }
    );
    this.getSelecteditem();
  }

  getSelecteditem() {
    this.allradioSelvisualInspectSample1 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_1_ok == true || Item.is_sample_1_not_ok == true
    );
    this.allradioSelvisualInspectSample1 =
      this.allradioSelvisualInspectSample1.every((ele: any) => ele === true);

    this.allradioSelvisualInspectSample2 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_2_ok == true || Item.is_sample_2_not_ok == true
    );
    this.allradioSelvisualInspectSample2 =
      this.allradioSelvisualInspectSample2.every((ele: any) => ele === true);

    this.radioSelvisualInspectSample1 = this.visualInspect.map(
      (Item: any) => Item.is_sample_1_ok == true
    );
    this.radioSelvisualInspectSample1 = this.radioSelvisualInspectSample1.every(
      (ele: any) => ele === true
    );

    this.radioSelvisualInspectSample2 = this.visualInspect.map(
      (Item: any) => Item.is_sample_2_ok == true
    );
    this.radioSelvisualInspectSample2 = this.radioSelvisualInspectSample2.every(
      (ele: any) => ele === true
    );

    if (
      this.allradioSelvisualInspectSample1 &&
      this.allradioSelvisualInspectSample2
    ) {
      this.disabledBtn = true;
    } else {
      this.disabledBtn = false;
    }

    if (
      this.radioSelvisualInspectSample1 &&
      this.radioSelvisualInspectSample2
    ) {
      this.isAllSampleCorrect = true;
    } else {
      this.isAllSampleCorrect = false;
    }
  }

  proceed() {
    this.fqaService.testComplete('Pitch measurement');
    this.router.navigate(['op/fqa/quality-inspection']);

    // const req = this.visualInspect.map((ele: any) => {
    //   return {
    //     id: ele.id,
    //     sample1: ele.sample1,
    //     sample2: ele.sample2,
    //     sample3: ele.sample3,
    //     sample4: ele.sample4,
    //     sample5: ele.sample5,
    //   };
    // });

    // const reqobj = {
    //   poid: this.poData.po_id,
    //   sachid: this.poData.sach_id,
    //   machineId: this.machineId,
    //   processId: this.processId,
    //   results: req,
    // };
    // this.sharedService
    //   .postSpcVisualResults(this.poData?.po_id, reqobj)
    //   .subscribe();
  }
}
