import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';
import { FqaService } from '../../fqa.service';

@Component({
  selector: 'app-fqa-hv-test',
  templateUrl: './fqa-hv-test.component.html',
  styleUrls: ['./fqa-hv-test.component.scss'],
})
export class FqaHvTestComponent implements OnInit {
  poData!: PO_DATA;
  machineId: any;
  processId: any;
  visualInspect: any[] = [];
  radioSelvisualInspectSample1: any;
  radioSelvisualInspectSample2: any;
  radioSelvisualInspectSample3: any;
  radioSelvisualInspectSample4: any;
  radioSelvisualInspectSample5: any;
  allradioSelvisualInspectSample1: any;
  allradioSelvisualInspectSample2: any;
  allradioSelvisualInspectSample3: any;
  allradioSelvisualInspectSample4: any;
  allradioSelvisualInspectSample5: any;
  disabledBtn: boolean = false;
  isAllSampleCorrect: boolean = false;
  countHeightSample: any[] = [];

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
    const type = 'hv';
    this.sharedService
      .getSpcvisualInspect(this.processId, type)
      .subscribe((resp: any) => {
        this.visualInspect = resp.data.map((key: any) => ({
          ...key,
          is_sample_1_ok: false,
          is_sample_1_not_ok: false,
          is_sample_2_ok: false,
          is_sample_2_not_ok: false,
          is_sample_3_ok: false,
          is_sample_3_not_ok: false,
          is_sample_4_ok: false,
          is_sample_4_not_ok: false,
          is_sample_5_ok: false,
          is_sample_5_not_ok: false,
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
        } else if (
          value.split('_')[0] == 'oksample3' &&
          value.split('_')[1] == index
        ) {
          record.sample3 = true;
          record.is_sample_3_ok = true;
          record.is_sample_3_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample3' &&
          value.split('_')[1] == index
        ) {
          record.sample3 = false;
          record.is_sample_3_not_ok = true;
          record.is_sample_3_ok = false;
        } else if (
          value.split('_')[0] == 'oksample4' &&
          value.split('_')[1] == index
        ) {
          record.sample4 = true;
          record.is_sample_4_ok = true;
          record.is_sample_4_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample4' &&
          value.split('_')[1] == index
        ) {
          record.sample4 = false;
          record.is_sample_4_not_ok = true;
          record.is_sample_4_ok = false;
        } else if (
          value.split('_')[0] == 'oksample5' &&
          value.split('_')[1] == index
        ) {
          record.sample5 = true;
          record.is_sample_5_ok = true;
          record.is_sample_5_not_ok = false;
        } else if (
          value.split('_')[0] == 'notoksample5' &&
          value.split('_')[1] == index
        ) {
          record.sample5 = false;
          record.is_sample_5_not_ok = true;
          record.is_sample_5_ok = false;
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

    this.allradioSelvisualInspectSample3 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_3_ok == true || Item.is_sample_3_not_ok == true
    );
    this.allradioSelvisualInspectSample3 =
      this.allradioSelvisualInspectSample3.every((ele: any) => ele === true);

    this.allradioSelvisualInspectSample4 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_4_ok == true || Item.is_sample_4_not_ok == true
    );
    this.allradioSelvisualInspectSample4 =
      this.allradioSelvisualInspectSample4.every((ele: any) => ele === true);

    this.allradioSelvisualInspectSample5 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_5_ok == true || Item.is_sample_5_not_ok == true
    );
    this.allradioSelvisualInspectSample5 =
      this.allradioSelvisualInspectSample5.every((ele: any) => ele === true);

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

    this.radioSelvisualInspectSample3 = this.visualInspect.map(
      (Item: any) => Item.is_sample_3_ok == true
    );
    this.radioSelvisualInspectSample3 = this.radioSelvisualInspectSample3.every(
      (ele: any) => ele === true
    );

    this.radioSelvisualInspectSample4 = this.visualInspect.map(
      (Item: any) => Item.is_sample_4_ok == true
    );
    this.radioSelvisualInspectSample4 = this.radioSelvisualInspectSample4.every(
      (ele: any) => ele === true
    );

    this.radioSelvisualInspectSample5 = this.visualInspect.map(
      (Item: any) => Item.is_sample_5_ok == true
    );
    this.radioSelvisualInspectSample5 = this.radioSelvisualInspectSample5.every(
      (ele: any) => ele === true
    );

    if (
      this.allradioSelvisualInspectSample1 &&
      this.allradioSelvisualInspectSample2 &&
      this.allradioSelvisualInspectSample3 &&
      this.allradioSelvisualInspectSample4 &&
      this.allradioSelvisualInspectSample5
    ) {
      this.disabledBtn = true;
    } else {
      this.disabledBtn = false;
    }

    if (
      this.radioSelvisualInspectSample1 &&
      this.radioSelvisualInspectSample2 &&
      this.radioSelvisualInspectSample3 &&
      this.radioSelvisualInspectSample4 &&
      this.radioSelvisualInspectSample5
    ) {
      this.isAllSampleCorrect = true;
    } else {
      this.isAllSampleCorrect = false;
    }
  }

  proceed() {
    // this.failSamples();
    const req = this.visualInspect.map((ele: any) => {
      return {
        id: ele.id,
        sample1: ele.sample1,
        sample2: ele.sample2,
        sample3: ele.sample3,
        sample4: ele.sample4,
        sample5: ele.sample5,
      };
    });

    const reqobj = {
      poid: this.poData.po_id,
      sachid: this.poData.sach_id,
      machineId: this.machineId,
      processId: this.processId,
      results: req,
    };

    // this.sharedService
    //   .postSpcVisualResults(this.poData?.po_id, reqobj)
    //   .subscribe();
    this.router.navigate(['op/fqa/fqa-po-checkout']);
    localStorage.setItem(
      'INSPECTORTYPE',
      this.fqaService.fqaProcessLog.electrical
    );
  }

  failSamples() {
    let heightSample = this.visualInspect.filter(
      (ele: any) => ele.parameter == 'Lead length check'
    );
    heightSample = heightSample.map((ele) => {
      return {
        sample1: ele.sample1,
        sample2: ele.sample2,
        sample3: ele.sample3,
        sample4: ele.sample4,
        sample5: ele.sample5,
      };
    });
    heightSample = Object.values(heightSample[0]);
    this.countHeightSample = heightSample.filter((ele: any) => ele === false);
  }
}
