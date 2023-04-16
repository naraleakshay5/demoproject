import { WindingService } from './../../winding.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-wd-machine-recipe-setup',
  templateUrl: './wd-machine-recipe-setup.component.html',
  styleUrls: ['./wd-machine-recipe-setup.component.scss'],
})
export class WdMachineRecipeSetupComponent implements OnInit {
  machinePartBatchCount: number = 0;
  constructor(
    private router: Router,
    private windingService: WindingService,
    private wsService: WebsocketService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.windingService.sentClickEventpoStageCompleted('machine-setup');
    this.wsService.machinePartsBatchCount.subscribe({
      next: (value: number) => {
        this.machinePartBatchCount = value;
      },
    });
  }

  bookScrapSetup() {
    this.appStorage.set('TEM_SETUP_SCRAP', this.machinePartBatchCount);
    this.router.navigate(['op/wd/scrap-booking']);
  }
}
