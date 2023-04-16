import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';
import { AoiSupervisorService } from '../aoi-supervisor.service';
import { AppStorage } from 'src/app/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aoi-supervisor-sorting',
  templateUrl: './aoi-supervisor-sorting.component.html',
  styleUrls: ['./aoi-supervisor-sorting.component.scss'],
})
export class AoiSupervisorSortingComponent implements OnInit {
  processors: any[] = [];
  poList: any;
  isAllPoSelected: boolean = false;
  machineId: any;
  processId: any;
  poData!: PO_DATA;
  sortingProduction: any;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private sharedService: SharedService,
    private supervisorService: AoiSupervisorService
  ) {}

  ngOnInit(): void {
    this.machineId = this.appStorage.get('MACHINE_ID');
    this.poData = this.appStorage.get('PO_DATA');

    this.getPoList();
    this.getProcessors();
  }

  getProcessors() {
    this.supervisorService.getProcessType().subscribe({
      next: (resp: any) => {
        this.processors = resp.data;
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
        const productionList = resp.data;
        this.poList = productionList.filter((po: any) => po.stage == 'new');

        this.sortingProduction = this.poList.map((key: any) => ({
          poId: key.production_order_id,
          machineId: this.machineId,
          aoi_process_type_id: null,
        }));
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  onProcessSelected(value: any, item: any) {
    item.isTouched = true;

    this.sortingProduction?.map((key: any) => {
      if (key.poId == item.production_order_id) {
        key.aoi_process_type_id = value;
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
    this.supervisorService.postSorting(this.sortingProduction).subscribe({
      error: (error) => {
        console.info(error);
      },
    });

    const data = this.poList.map((key: any) => ({
      poId: key.production_order_id,
      machineId: this.machineId,
      stage: 'SORTING',
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
