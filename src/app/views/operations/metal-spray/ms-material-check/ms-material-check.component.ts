import { SharedService } from './../../Shared/shared.service';
import { PoData } from './../../Shared/shared-model';
import { MetalSprayService } from './../metal-spray.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ms-material-check',
  templateUrl: './ms-material-check.component.html',
  styleUrls: ['./ms-material-check.component.scss'],
})
export class MsMaterialCheckComponent implements OnInit {
  materialDetails: any[] = [];
  val: any;
  isMaterialAllSelected: boolean = false;
  enableSuccess: boolean = false;
  enableWarning: boolean = false;
  poData!: PoData;
  processId!: number;
  material: any;
  machineId!: number;
  activeGun1Material!: string;
  activeGun2Material!: string;
  requiredGun1Material: any;
  requiredGun2Material: any;
  requiredGun1WireDiamerter: any;
  activeGun1WireDiameter: any;
  requiredGun2WireDiamerter: any;
  activeGun2WireDiameter: any;
  requiredGun1MaterialName!: string;
  requiredGun2MaterialName!: string;
  activeGun1MaterialName!: string;
  activeGun2MaterialName!: string;

  constructor(
    private router: Router,
    private metalSprayService: MetalSprayService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    const processId = localStorage.getItem('PROCESS_ID')!;
    this.processId = JSON.parse(processId);
    const machineId = localStorage.getItem('MACHINE_ID')!;
    this.machineId = JSON.parse(machineId);
    this.getMaterial();
  }

  getMaterial() {
    this.metalSprayService
      .getMaterial(this.poData.sach_id, this.processId, this.poData?.po_id)
      .subscribe((resp: any) => {
        this.material = resp.data;

        //Required Gun1 Material
        this.requiredGun1Material = this.material[0]?.required_material_code;
        this.requiredGun1MaterialName =
          this.material[0]?.required_material_name;
        localStorage.setItem(
          'REQUIRED_GUN1_MATERIAL_CODE',
          JSON.stringify(this.material[0]?.required_material_code)
        );
        localStorage.setItem(
          'REQUIRED_MATERIAL',
          JSON.stringify(this.material)
        );
        //Required Gun2 Material
        this.requiredGun2Material = this.material[1]?.required_material_code;
        this.requiredGun2MaterialName =
          this.material[1]?.required_material_name;
        localStorage.setItem(
          'REQUIRED_GUN2_MATERIAL_CODE',
          JSON.stringify(this.material[1]?.required_material_code)
        );

        //Active Gun1 Material
        this.activeGun1Material =
          this.material[0]?.active_material_code.split('|')[0];
        this.activeGun1MaterialName = this.material[0]?.active_material_name;
        //active Gun2 Material
        this.activeGun2Material =
          this.material[1]?.active_material_code.split('|')[0];
        this.activeGun2MaterialName = this.material[1]?.active_material_name;

        this.requiredGun1WireDiamerter =
          this.material[0]?.required_material_diameter;
        localStorage.setItem(
          'REQUIRED_GUN1_WIRE_DIAMETER',
          JSON.stringify(this.material[0]?.required_material_diameter)
        );
        this.requiredGun2WireDiamerter =
          this.material[1]?.required_material_diameter;
        localStorage.setItem(
          'REQUIRED_GUN2_WIRE_DIAMETER',
          JSON.stringify(this.material[1]?.required_material_diameter)
        );

        this.activeGun1WireDiameter =
          this.material[0]?.active_material_diameter;
        this.activeGun2WireDiameter =
          this.material[1]?.active_material_diameter;

        this.isAllMaterialChecked();
      });
  }

  changeMaterial() {
    this.sharedService.sentClickEventpoStageCompleted('material-check');
    this.router.navigate(['/op/ms/material-scan']);
  }

  proceedToMachineStup() {
    const requiredMaterial = [
      {
        spray_material_code: this.requiredGun1Material,
        location: 'G1',
      },
      {
        spray_material_code: this.requiredGun2Material,
        location: 'G2',
      },
    ];

    let requiredMaterialWithCodes = requiredMaterial.map((drumCode: any) => {
      const mat = this.material.find((mtl: any) => {
        return drumCode.required_material_code == mtl.spray_material_code;
      });

      return {
        ...drumCode,
        material_id: mat.required_material_id,
      };
    });

    const reqArraay = {
      production_order_id: this.poData.po_id,
      process_id: this.processId,
      machine_id: this.machineId,
      spray_gun: requiredMaterialWithCodes,
    };

    this.metalSprayService.addRequiredMaterial(reqArraay).subscribe({
      next: (res: any) => {
        this.sharedService.sentClickEventpoStageCompleted('material-check');
        localStorage.removeItem('GUN_2_DETAILS');
        this.router.navigate(['/op/ms/wheel-operation']);
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  isAllMaterialChecked() {
    if (
      this.requiredGun1Material == this.activeGun1Material &&
      this.requiredGun2Material == this.activeGun2Material &&
      this.requiredGun1WireDiamerter == this.activeGun1WireDiameter &&
      this.requiredGun2WireDiamerter == this.activeGun2WireDiameter
    ) {
      this.isMaterialAllSelected = true;
    } else {
      this.isMaterialAllSelected = false;
    }
  }

  backToPoList() {
    this.metalSprayService
      .backToPoList(this.poData?.po_id, this.processId, this.machineId)
      .subscribe((resp: any) => {
        this.router.navigate(['po-list']);
      });
  }
}
