import { PO_DATA } from '../../../Shared/shared-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { SharedService } from '../../../Shared/shared.service';
import { AoiSupervisorService } from '../aoi-supervisor.service';

@Component({
  selector: 'app-aoi-supervisor-processor',
  templateUrl: './aoi-supervisor-processor.component.html',
  styleUrls: ['./aoi-supervisor-processor.component.scss'],
})
export class AoiSupervisorProcessorComponent implements OnInit {
  processorsIds: any[] = [];
  poList: any;
  isAllPoSelected: boolean = false;
  machineId: any;
  processId: any;
  processorProduction: any;
  poData!: PO_DATA;

  constructor(
    private router: Router,
    private supervisorService: AoiSupervisorService,
    private appStorage: AppStorage,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.poData = this.appStorage.get('PO_DATA');

    this.getPoList();
    this.getProcessorsId();
  }

  getProcessorsId() {
    this.supervisorService.getProcessors().subscribe({
      next: (resp: any) => {
        this.processorsIds = resp.data;
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  getPoList() {
    this.processId = this.appStorage.get('PROCESS_ID');

    this.sharedService.getPoList(this.machineId, this.processId).subscribe({
      next: (resp: any) => {
        this.poList = resp.data.filter((po: any) => po.stage == 'SORTING');

        this.processorProduction = this.poList.map((key: any) => ({
          poId: key.production_order_id,
          processorId: null,
        }));
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  onProcessSelected(value: any, item: any) {
    item.isTouched = true;

    this.processorProduction?.map((key: any) => {
      if (key.poId == item.production_order_id) {
        key.processorId = value;
      }
    });

    let count = 0;
    this.poList.forEach((element: any) => {
      if (element.isTouched == true) {
        count++;
        if (count == this.poList.length) {
          this.isAllPoSelected = true;
        } else {
          this.isAllPoSelected = false;
        }
      }
    });
  }

  onSubmit() {
    this.supervisorService.postProcessor(this.processorProduction).subscribe({
      error: (error) => {
        console.info(error);
      },
    });

    const data = this.poList.map((key: any) => ({
      poId: key.production_order_id,
      machineId: this.machineId,
      stage: 'PROCESSOR',
    }));

    this.supervisorService.logStage(data).subscribe({
      next: (resp: any) => {
        this.router.navigate(['/aoi-sup']);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }
}
