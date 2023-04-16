import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { cilCheck, cilWarning, cilAlarm } from '@coreui/icons';
import { WebsocketService } from 'src/app/websocket.service';
import { AssemblyService } from '../../assembly/assembly.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-common-jobs',
  templateUrl: './common-jobs.component.html',
  styleUrls: ['./common-jobs.component.scss'],
})
export class CommonJobsComponent implements OnInit {
  icons = { cilCheck, cilWarning };
  alarms: any[] = [];
  isDisebled: boolean = false;
  @Input() isAlarms: boolean = false;
  @Output() modalCheck = new EventEmitter();
  @Output() modalCheckCacelled = new EventEmitter();

  @Input() isOpen: boolean = false;
  @Output() scanModal = new EventEmitter();
  @Output() cancelScan = new EventEmitter();
  inputfocus: boolean = true;
  @ViewChild('scanInput') scanInput!: ElementRef;
  barCode: string = '';
  scannedValue: any;
  alarmsCuring: any[] = [];

  constructor(
    private wsService: WebsocketService,
    private sharedService: SharedService,
    private assemblyService: AssemblyService
  ) {}

  ngOnInit(): void {
    this.wsService.alarms.subscribe({
      next: (values: any) => {
        this.alarms = values;
        this.isAlarms = !!this.alarms && !!this.alarms.length;
        this.isDisebled = false;
        this.modalCheck.emit();
      },
    });

    this.wsService.alarmsCuring.subscribe({
      next: (values: any) => {
        this.alarmsCuring = values;
        this.isAlarms = !!this.alarmsCuring && !!this.alarmsCuring.length;
        this.isDisebled = false;
        this.modalCheck.emit();
      },
    });

    this.barCode = '';
    setInterval(() => {
      this.scanInput.nativeElement.focus();
    }, 100);
  }

  reset(value: any) {
    this.isDisebled = true;
    if (value === 'assembly') {
      this.wsService.sendNode(
        this.sharedService.machineInterlocks.Machine_Alarm_reset,
        true
      );
      setTimeout(() => {
        this.wsService.sendNode(
          this.sharedService.machineInterlocks.Machine_Alarm_reset,
          false
        );
      }, 1000);
    } else {
      this.wsService.sendNodeForCuring(
        this.sharedService.machineInterlocks.Machine_Alarm_reset,
        true
      );
      setTimeout(() => {
        this.wsService.sendNodeForCuring(
          this.sharedService.machineInterlocks.Machine_Alarm_reset,
          false
        );
      }, 1000);
    }
  }

  toggleVisibility() {
    this.isDisebled = false;
    this.isAlarms = !this.isAlarms;
    this.modalCheckCacelled.emit();
  }

  toggleVisibilityScanner() {
    this.isOpen = !this.isOpen;
    this.cancelScan.emit();
  }

  getInputValue() {
    setTimeout(() => {
      this.scanModal.emit(this.barCode);
    }, 100);
    this.isOpen = false;
  }
}
