import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-tp-line-clearance',
  templateUrl: './tp-line-clearance.component.html',
  styleUrls: ['./tp-line-clearance.component.scss'],
})
export class TpLineClearanceComponent implements OnInit {
  isClear: boolean = false;
  machine: any;
  poData!: PO_DATA;
  count: number = 0;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machine = this.appStorage.get('MACHINE');
    this.machine = this.machine.find((ele: any) => ele.is_primary === true);
    this.poData = this.appStorage.get('PO_DATA');
  }

  onCheck(event: any) {
    this.isClear = event.target.checked;

    if (this.isClear) {
      this.count++;
    } else {
      this.count--;
    }
  }
  onSubmit() {
    this.router.navigate(['op/tp/tool-change-over']);
  }
}
