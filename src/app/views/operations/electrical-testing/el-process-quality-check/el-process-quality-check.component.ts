import { PoData } from './../../Shared/shared-model';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from './../../Shared/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-el-process-quality-check',
  templateUrl: './el-process-quality-check.component.html',
  styleUrls: ['./el-process-quality-check.component.scss'],
})
export class ElProcessQualityCheckComponent implements OnInit {
  machineId: any;
  processId: any;
  visualInspect: any[] = [];
  //Top Printing
  radioTopPrintingVisualInspect_sample_1: any;
  radioTopPrintingVisualInspect_sample_2: any;
  radioTopPrintingVisualInspect_sample_3: any;
  radioTopPrintingVisualInspect_sample_4: any;
  radioTopPrintingVisualInspect_sample_5: any;
  AllradioTopPrintingVisualInspect_sample_1: any;
  AllradioTopPrintingVisualInspect_sample_2: any;
  AllradioTopPrintingVisualInspect_sample_3: any;
  AllradioTopPrintingVisualInspect_sample_4: any;
  AllradioTopPrintingVisualInspect_sample_5: any;

  //Side Marking
  radioSideMarVisualInspect_sample_1: any;
  radioSideMarVisualInspect_sample_2: any;
  radioSideMarVisualInspect_sample_3: any;
  radioSideMarVisualInspect_sample_4: any;
  radioSideMarVisualInspect_sample_5: any;
  AllradioSideMarkingVisualInspect_sample_1: any;
  AllradioSideMarkingVisualInspect_sample_2: any;
  AllradioSideMarkingVisualInspect_sample_3: any;
  AllradioSideMarkingVisualInspect_sample_4: any;
  AllradioSideMarkingVisualInspect_sample_5: any;

  //Lead highest Sample
  leadLengthSample1: number | null = null;
  leadLengthSample2: number | null = null;
  leadLengthSample3: number | null = null;
  leadLengthSample4: number | null = null;
  leadLengthSample5: number | null = null;

  //Lead highest Sample
  leadLengthRightSample1: number | null = null;
  leadLengthRightSample2: number | null = null;
  leadLengthRightSample3: number | null = null;
  leadLengthRightSample4: number | null = null;
  leadLengthRightSample5: number | null = null;

  disabledBtn: boolean = false;
  isAllSampleCorrect: boolean = false;
  countPitchSample: any;
  countDTSample: any;
  countWeldingSample: any;
  poData!: PoData;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.processId = this.appStorage.get('PROCESS_ID');

    this.getSpcvisualInspect();
  }

  getSpcvisualInspect() {
    const type = 'visual';
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
    this.AllradioTopPrintingVisualInspect_sample_1 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_1_ok == true || Item.is_sample_1_not_ok == true
    );
    this.AllradioTopPrintingVisualInspect_sample_1 =
      this.AllradioTopPrintingVisualInspect_sample_1.every(
        (ele: any) => ele === true
      );

    this.AllradioTopPrintingVisualInspect_sample_3 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_2_ok == true || Item.is_sample_2_not_ok == true
    );
    this.AllradioTopPrintingVisualInspect_sample_3 =
      this.AllradioTopPrintingVisualInspect_sample_3.every(
        (ele: any) => ele === true
      );

    this.AllradioTopPrintingVisualInspect_sample_3 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_3_ok == true || Item.is_sample_3_not_ok == true
    );
    this.AllradioTopPrintingVisualInspect_sample_3 =
      this.AllradioTopPrintingVisualInspect_sample_3.every(
        (ele: any) => ele === true
      );

    this.AllradioTopPrintingVisualInspect_sample_4 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_4_ok == true || Item.is_sample_4_not_ok == true
    );
    this.AllradioTopPrintingVisualInspect_sample_4 =
      this.AllradioTopPrintingVisualInspect_sample_4.every(
        (ele: any) => ele === true
      );

    this.AllradioTopPrintingVisualInspect_sample_5 = this.visualInspect.map(
      (Item: any) =>
        Item.is_sample_5_ok == true || Item.is_sample_5_not_ok == true
    );
    this.AllradioTopPrintingVisualInspect_sample_5 =
      this.AllradioTopPrintingVisualInspect_sample_5.every(
        (ele: any) => ele === true
      );

    this.radioTopPrintingVisualInspect_sample_1 = this.visualInspect.map(
      (Item: any) => Item.is_sample_1_ok == true
    );
    this.radioTopPrintingVisualInspect_sample_1 =
      this.radioTopPrintingVisualInspect_sample_1.every(
        (ele: any) => ele === true
      );

    this.radioTopPrintingVisualInspect_sample_2 = this.visualInspect.map(
      (Item: any) => Item.is_sample_2_ok == true
    );
    this.radioTopPrintingVisualInspect_sample_2 =
      this.radioTopPrintingVisualInspect_sample_2.every(
        (ele: any) => ele === true
      );

    this.radioTopPrintingVisualInspect_sample_3 = this.visualInspect.map(
      (Item: any) => Item.is_sample_3_ok == true
    );
    this.radioTopPrintingVisualInspect_sample_3 =
      this.radioTopPrintingVisualInspect_sample_3.every(
        (ele: any) => ele === true
      );

    this.radioTopPrintingVisualInspect_sample_4 = this.visualInspect.map(
      (Item: any) => Item.is_sample_4_ok == true
    );
    this.radioTopPrintingVisualInspect_sample_4 =
      this.radioTopPrintingVisualInspect_sample_4.every(
        (ele: any) => ele === true
      );
    this.radioTopPrintingVisualInspect_sample_5 = this.visualInspect.map(
      (Item: any) => Item.is_sample_5_ok == true
    );
    this.radioTopPrintingVisualInspect_sample_5 =
      this.radioTopPrintingVisualInspect_sample_5.every(
        (ele: any) => ele === true
      );

    if (
      this.AllradioTopPrintingVisualInspect_sample_1 &&
      this.AllradioTopPrintingVisualInspect_sample_3 &&
      this.AllradioTopPrintingVisualInspect_sample_3 &&
      this.AllradioTopPrintingVisualInspect_sample_4 &&
      this.AllradioTopPrintingVisualInspect_sample_5
    ) {
      this.disabledBtn = true;
    } else {
      this.disabledBtn = false;
    }

    if (
      this.radioTopPrintingVisualInspect_sample_1 &&
      this.radioTopPrintingVisualInspect_sample_2 &&
      this.radioTopPrintingVisualInspect_sample_3 &&
      this.radioTopPrintingVisualInspect_sample_4 &&
      this.radioTopPrintingVisualInspect_sample_5
    ) {
      this.isAllSampleCorrect = true;
    } else {
      this.isAllSampleCorrect = false;
    }
  }

  proceed() {
    this.poData = this.appStorage.get('PO_DATA');

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

    const reqForSideMarking = this.visualInspect.map((ele: any) => {
      return {
        id: ele.id,
        sample1: ele.sample1,
        sample2: ele.sample2,
        sample3: ele.sample3,
        sample4: ele.sample4,
        sample5: ele.sample5,
      };
    });

    const reqForLeadLength = {
      id: this.leadLengthSample1,
      sample1: this.leadLengthSample1,
      sample2: this.leadLengthSample1,
      sample3: this.leadLengthSample1,
      sample4: this.leadLengthSample1,
      sample5: this.leadLengthSample1,
    };

    const reqobj = {
      poid: this.poData?.po_id,
      sachid: this.poData?.sach_id,
      machineId: this.machineId,
      processId: this.processId,
      results: req,
    };
    this.sharedService.sentClickEventpoStageCompleted('process-quality-check');
    this.sharedService
      .postSpcVisualResults(this.poData?.po_id, reqobj)
      .subscribe();
    this.router.navigate(['op/el/operations']);
  }

  reworkModalCanceled() {}

  reportMaintenance() {
    this.router.navigate(['op/el/operations']);
  }
}
