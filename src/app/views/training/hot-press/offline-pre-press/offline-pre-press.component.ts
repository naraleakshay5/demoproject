import { Component, OnInit } from '@angular/core';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-offline-pre-press',
  templateUrl: './offline-pre-press.component.html',
  styleUrls: ['./offline-pre-press.component.scss'],
})
export class OfflinePrePressComponent implements OnInit {
  scrapetup: boolean = false;
  //poData!: PO_DATA;
  operationalsLogs: any[] = [];
  constructor(private appStorage: AppStorage) {}

  ngOnInit(): void {
    this.appStorage.set('TEM_LAST_URL', 'offline-pre-press');
  }
  onCheck(event: any) {
    this.scrapetup = event.target.checked;
    //this.setupScrap = event.target.checked;
  }
}
