import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';
import { WebsocketService } from 'src/app/websocket.service';
import { WindingService } from '../../winding/winding.service';
import { PoData } from '../shared-model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  user: any;
  poData!: any;
  machineId: any;
  constructor(
    private helperService: HelperService,
    private router: Router,
    private windingService: WindingService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('logout');
    this.user = this.appStorage.get('USER_DATA');
    this.poData = this.appStorage.get('PO_DATA');
    this.machineId = this.appStorage.get('MACHINE_ID');
  }

  checkOut() {
    if (this.user.role == 'Setter') {
      this.wsService.sendNode(
        this.windingService.machineInterlocks.BATCH_START_CHECKS_COMPLETED,
        false
      );
    }
    this.windingService
      .poCheckOut(this.poData.po_id, this.machineId)
      .subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.router.navigate(['/po-list']);
            this.appStorage.clear('TEM_LAST_URL');
          }
        },
        error: (error) => {
          console.info(error);
        },
      });
  }
}
