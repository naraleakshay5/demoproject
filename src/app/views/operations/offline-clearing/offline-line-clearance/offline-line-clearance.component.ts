import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-offline-line-clearance',
  templateUrl: './offline-line-clearance.component.html',
  styleUrls: ['./offline-line-clearance.component.scss'],
})
export class OfflineLineClearanceComponent implements OnInit {
  isClear: boolean = false;
  machine: any;
  poData!: PO_DATA;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.machine = this.appStorage.get('MACHINE');
    this.poData = this.appStorage.get('PO_DATA');
  }

  onCheck(event: any) {
    this.isClear = event.target.checked;
  }
  onSubmit() {
    this.sharedService.sentClickEventpoStageCompleted('line-clearance');
    this.router.navigate(['op/offline/recipe-setup']);
  }
}
