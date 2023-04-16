import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/views/operations/masking/masking-model';

@Component({
  selector: 'app-ma-material-tool-machine-setup',
  templateUrl: './ma-material-tool-machine-setup.component.html',
  styleUrls: ['./ma-material-tool-machine-setup.component.scss'],
})
export class MaMAterialToolMachineSetupComponent implements OnInit {
  materialDetails: any = [
    {
      material_name: 'cello_tape_id',
      material_code: 'C1234',
      isChecked: false,
      required_size: 19,
      tape_size: [9, 12, 19, 24, 30, 48],
      tape_colors: ['white', 'yellow'],
    },
    {
      material_name: 'masking_tape',
      material_code: 'T1234',
      isChecked: false,
      required_size: 19,
      tape_size: [9, 12, 19, 24, 30, 48],
      tape_colors: ['brown', 'yellow'],
    },
  ];

  toolsList: any = [
    {
      tool_name: 'Element Guide Plate',
      required_value: 22.5,
      isChecked: false,
      leadSpace: [10, 15, 22.5, 27.5, 37.5],
    },
    {
      tool_name: 'Pusher',
      required_value: 22.5,
      isChecked: false,
      leadSpace: [10, 15, 22.5, 27.5, 37.5],
    },
  ];

  isAllMaterialSelected: boolean = false;
  completeMaterialCheck: boolean = false;
  completeToolCheck: boolean = false;
  isToolAllSelected: boolean = false;
  completeMachineSetup: boolean = false;

  isRollerPressureChecked: boolean = false;
  isSpringAdjustmentChecked: boolean = false;
  isHammerSettingChecked: boolean = false;
  isTapePlateSettingChecked: boolean = false;
  isAllChecked: boolean = false;
  sizeCount!: number;
  isSizeSelected: boolean = false;
  isPoStarted: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  maskingStarted() {
    this.isPoStarted = true;
  }

  onTapeColorSelected(value: string, item: Material) {
    item.isTouched = true;
    this.checkForAllScannedTools();
  }

  onTapeSizeSelected(value: string, item: any) {
    this.sizeCount = 0;
    if (value == item.required_size) {
      this.sizeCount++;
    }

    if (this.sizeCount >= 2) {
      this.isSizeSelected = true;
    }
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
    this.completeMaterialCheck = true;
    this.completeToolCheck = true;
  }

  onToolSelected(value: any, item: any) {
    item.isTouched = true;

    if (value == item.required_value) {
      item.isChecked = true;
    } else {
      item.isChecked = false;
    }

    let count = 0;
    this.toolsList.forEach((element: any) => {
      if (element.isChecked == true) {
        count++;
        if (count == this.toolsList.length) {
          this.isToolAllSelected = true;
        } else {
          this.isToolAllSelected = false;
        }
      }
    });
  }

  proceedToCompleteToolCheck() {
    this.completeToolCheck = false;
    this.completeMachineSetup = true;
  }

  checkRollerPressure(rollerPressure: any) {
    this.isRollerPressureChecked = rollerPressure.target.checked;
    this.isAllCheckChecked();
  }

  checkSpringAdjustment(springAdjustment: any) {
    this.isSpringAdjustmentChecked = springAdjustment.target.checked;
    this.isAllCheckChecked();
  }

  checkHammerSetting(hammerSetting: any) {
    this.isHammerSettingChecked = hammerSetting.target.checked;
    this.isAllCheckChecked();
  }

  checkTapePlateSetting(tapePlateSetting: any) {
    this.isTapePlateSettingChecked = tapePlateSetting.target.checked;
    this.isAllCheckChecked();
  }

  isAllCheckChecked() {
    if (
      this.isRollerPressureChecked &&
      this.isSpringAdjustmentChecked &&
      this.isHammerSettingChecked &&
      this.isTapePlateSettingChecked
    ) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
  }

  proceedToCompletemachineSetup() {
    this.completeMachineSetup = true;
    this.router.navigate(['training/masking-recipe']);
  }
}
