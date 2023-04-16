import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ma-machine-setup',
  templateUrl: './ma-machine-setup.component.html',
  styleUrls: ['./ma-machine-setup.component.scss'],
})
export class MaMachineSetupComponent implements OnInit {
  isRollerPressureChecked: boolean = false;
  isSpringAdjustmentChecked: boolean = false;
  isAllChecked: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  checkRollerPressure(rollerPressure: any) {
    this.isRollerPressureChecked = rollerPressure.target.checked;
    this.isAllCheckChecked();
  }

  checkSpringAdjustment(springAdjustment: any) {
    this.isSpringAdjustmentChecked = springAdjustment.target.checked;
    this.isAllCheckChecked();
  }

  isAllCheckChecked() {
    if (this.isRollerPressureChecked && this.isSpringAdjustmentChecked) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
  }

  proceedToCompletemachineSetup() {
    this.router.navigate(['op/ma/recipe-setup']);
  }
}
