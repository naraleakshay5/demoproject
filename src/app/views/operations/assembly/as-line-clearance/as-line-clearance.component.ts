import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-line-clearance',
  templateUrl: './as-line-clearance.component.html',
  styleUrls: ['./as-line-clearance.component.scss'],
})
export class AsLineClearanceComponent implements OnInit {
  isClear: boolean = false;
  machine: any;
  wicPoData!: PO_DATA;
  count: number = 0;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private assemblyService: AssemblyService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machine = this.appStorage.get('MACHINE');
    this.machine = this.machine.find((ele: any) => ele.is_primary === true);
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');
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
    this.router.navigate(['op/as/change-over']);
    this.assemblyService.sentClickEventpoStageCompleted(
      'line-clearance',
      this.wicPoData.po_id
    );
  }
}
