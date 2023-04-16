import { MaskingService } from './../masking.service';
import { WebsocketService } from 'src/app/websocket.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-masking',
  templateUrl: './start-masking.component.html',
  styleUrls: ['./start-masking.component.scss'],
})
export class StartMaskingComponent implements OnInit {
  isProceeded: boolean = false;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
    private maskingService: MaskingService
  ) {}

  ngOnInit(): void {}

  proceedToMasking() {
    this.isProceeded = true;
  }

  startTheProcess() {
    this.wsService.sendNode(
      this.maskingService.machineInterlocks.PROC_INTL_STOP_MACHINE,
      false
    );

    this.router.navigate(['op/ma/masking']);
  }
}
