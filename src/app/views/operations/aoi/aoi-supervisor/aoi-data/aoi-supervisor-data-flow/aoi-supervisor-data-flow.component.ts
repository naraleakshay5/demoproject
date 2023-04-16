import { AppStorage } from 'src/app/storage.service';
import { AoiSupervisorService } from '../../aoi-supervisor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aoi-supervisor-data-flow',
  templateUrl: './aoi-supervisor-data-flow.component.html',
  styleUrls: ['./aoi-supervisor-data-flow.component.scss'],
})
export class AoiSupervisorDataFlowComponent implements OnInit {
  remark!: string;
  noOfGoodBoxes!: number;
  noOfBadBoxes!: number;
  qaQuantity!: number;
  unitWt!: number;
  noOfGoodElement!: number;
  noOfBadElement!: number;

  constructor(
    private aoiSupervisorService: AoiSupervisorService,
    private appStorage: AppStorage,
    private router: Router
  ) {}

  ngOnInit(): void {}

  printData() {
    const poId: number = this.appStorage.get('PO_ID');
    const machineId: number = this.appStorage.get('MACHINE_ID');
    const data = {
      good_bin_count: this.noOfGoodBoxes,
      bad_bin_count: this.noOfGoodBoxes,
      bad_element_count: this.noOfBadElement,
      good_element_count: this.noOfGoodElement,
    };
    this.aoiSupervisorService.printData(data).subscribe({
      error: (error) => {
        console.info(error);
      },
    });

    const stage = {
      poId: poId,
      machineId: machineId,
      stage: 'CHECKOUT',
    };

    this.aoiSupervisorService.logStage(stage).subscribe({
      next: (resp: any) => {
        this.router.navigate(['/aoi-sup/data/']);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }
}
