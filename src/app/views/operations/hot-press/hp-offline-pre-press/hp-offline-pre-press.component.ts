import { Component, OnInit } from '@angular/core';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-hp-offline-pre-press',
  templateUrl: './hp-offline-pre-press.component.html',
  styleUrls: ['./hp-offline-pre-press.component.scss'],
})
export class HpOfflinePrePressComponent implements OnInit {
  setupScrap: boolean = false;
  poData!: PO_DATA;
  operationalsLogs: any[] = [];

  constructor(
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.operationalsLogs = this.appStorage.getOperationalLogs();
    this.sharedService.sentClickEventpoStageCompleted('ip-carrier-scan');
    this.poData = this.appStorage.get('PO_DATA');
  }

  onCheck(event: any) {
    this.setupScrap = event.target.checked;
  }
}
