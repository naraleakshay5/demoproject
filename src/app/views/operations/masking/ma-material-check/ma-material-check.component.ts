import { SharedService } from './../../Shared/shared.service';
import { Material } from './../masking-model';
import { MaskingService } from './../masking.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoData } from '../../Shared/shared-model';

@Component({
  selector: 'app-ma-material-check',
  templateUrl: './ma-material-check.component.html',
  styleUrls: ['./ma-material-check.component.scss'],
})
export class MaMaterialCheckComponent implements OnInit {
  isAllMaterialSelected: boolean = false;

  poData!: PoData;
  machineId!: number;
  materialDetails: any;

  constructor(
    private router: Router,
    private maskingService: MaskingService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    this.getPoMaterial();
  }

  getPoMaterial() {
    this.maskingService
      .getMaterialCheckPo(this.poData?.sach_id)
      .subscribe((resp: any) => {
        this.materialDetails = resp.data;
        this.materialDetails = resp.data.map((key: any) => ({
          ...key,
          isChecked: false,
        }));
      });
  }

  onTapeColorSelected(value: string, item: Material) {
    item.isTouched = true;
    this.checkForAllScannedTools();
  }

  checkForAllScannedTools() {
    let count = 0;
    this.materialDetails.forEach((element: any) => {
      if (element.isTouched == true) {
        count++;
        if (count == this.materialDetails.length) {
          this.isAllMaterialSelected = true;
        } else {
          this.isAllMaterialSelected = false;
        }
      }
    });
  }

  proceedToCompleteMaterialCheck() {
    this.sharedService.sentClickEventpoStageCompleted('material-check');
    this.router.navigate(['op/ma/tool-check']);
  }
}
