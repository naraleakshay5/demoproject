import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cilCheck, cilWarning } from '@coreui/icons';
import { AppStorage } from 'src/app/storage.service';
import { FqaService } from '../fqa.service';

@Component({
  selector: 'app-fqa-quality-inspection',
  templateUrl: './fqa-quality-inspection.component.html',
  styleUrls: ['./fqa-quality-inspection.component.scss'],
})
export class FqaQualityInspectionComponent implements OnInit {
  btnsBoxed = [
    { name: 'Printing Check', isComplete: false },
    { name: 'Resin Height Check', isComplete: false },
    { name: 'Visual Inspection', isComplete: false },
    { name: 'Lead length Check', isComplete: false },
    { name: 'Pitch measurement', isComplete: false },
    { name: 'Dimensions Check', isComplete: false },
    // { name: 'Solder gun test', isComplete: false },
  ];

  btnsTaped = [
    { name: 'Resin Height Check', isComplete: false },
    { name: 'Visual Inspection', isComplete: false },
    { name: 'Taping gauge', isComplete: false },
    { name: 'Pull Test', isComplete: false },
    { name: 'Dimensions Check', isComplete: false },
  ];

  btnsRestoBoxed = [
    { name: 'Printing Check', isComplete: false },
    { name: 'Visual Inspection', isComplete: false },
    { name: 'Lead length Check', isComplete: false },
    { name: 'Cap Value Check', isComplete: false },
  ];

  icons = { cilCheck, cilWarning };

  buttons: any[] = [];

  testingType: string | null = '';
  disabledBtn: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fqaService: FqaService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.testingType = localStorage.getItem('TYPE');
    const buttons = localStorage.getItem('BUTTONS')!;
    this.buttons = JSON.parse(buttons);

    if (this.buttons == null) {
      if (this.testingType == 'boxed') {
        this.buttons = this.btnsBoxed;
        localStorage.setItem('BUTTONS', JSON.stringify(this.buttons));
      } else if (this.testingType == 'taped') {
        this.buttons = this.btnsTaped;
        localStorage.setItem('BUTTONS', JSON.stringify(this.buttons));
      } else if (this.testingType == 'restoBoxed') {
        this.buttons = this.btnsRestoBoxed;
        localStorage.setItem('BUTTONS', JSON.stringify(this.buttons));
      }
    }
    let btn = [];
    btn = this.buttons?.filter((e: any) => e.isComplete == true);
    this.disabledBtn = this.buttons?.length == btn.length ? true : false;
  }

  check(button: any) {
    if (this.testingType == 'restoBoxed') {
      if (button == 'Printing Check') {
        this.router.navigate(['op/fqa/resto-box-printing-check']);
      } else if (button == 'Visual Inspection') {
        this.router.navigate(['op/fqa/resto-box-visual-inspection']);
      } else if (button == 'Cap Value Check') {
        this.router.navigate(['op/fqa/cap-value-check']);
      } else if (button == 'Lead length Check') {
        this.router.navigate(['op/fqa/lead-length-check']);
      }
    } else {
      if (button == 'Printing Check') {
        this.router.navigate(['op/fqa/printing-check']);
      } else if (button == 'Resin Height Check') {
        this.router.navigate(['op/fqa/resin-height-check']);
      } else if (button == 'Visual Inspection') {
        this.router.navigate(['op/fqa/qty-visual-inspection']);
      } else if (button == 'Lead length Check') {
        this.router.navigate(['op/fqa/lead-length-check']);
      } else if (button == 'Pitch measurement') {
        this.router.navigate(['op/fqa/pitch-measurement']);
      } else if (button == 'Dimensions Check') {
        this.router.navigate(['op/fqa/capacitor-dimensions']);
      } else if (button == 'Solder gun test') {
        this.router.navigate(['op/fqa/solder-gun-test']);
      } else if (button == 'Taping gauge') {
        this.router.navigate(['op/fqa/taping-gauge']);
      } else if (button == 'Pull Test') {
        this.router.navigate(['op/fqa/pull-test']);
      }
    }
  }

  proceed() {
    if (this.testingType == 'restoBoxed') {
      this.router.navigate(['op/fqa/fqa-po-checkout']);
      if (this.appStorage.get('STATION').process_slug === 'taping') {
        this.appStorage.set(
          'INSPECTORTYPE',
          this.fqaService.fqaProcessLog.tapingMechanicalCompleted
        );
      } else {
        this.appStorage.set(
          'INSPECTORTYPE',
          this.fqaService.fqaProcessLog.firstMechanical
        );
      }
    } else if (this.testingType == 'taped') {
      this.router.navigate(['op/fqa/label-scan']);
    } else {
      this.router.navigate(['op/fqa/resto-box']);
    }
    localStorage.removeItem('BUTTONS');
  }
}
