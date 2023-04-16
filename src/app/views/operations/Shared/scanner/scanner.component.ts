import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  @Input() isOpen: boolean = false;

  @Output() scanModal = new EventEmitter();
  @Output() cancelScan = new EventEmitter();
  inputfocus: boolean = true;

  @ViewChild('scanInput') scanInput!: ElementRef;

  constructor(private elementRef: ElementRef) {}
  toggle: boolean = false;
  visible = true;
  barCode: string = '';
  scannedValue: any;

  ngOnInit() {
    this.inputfocus = true;

    setInterval(() => {
      this.scanInput.nativeElement.focus();
    }, 100);
  }

  checked() {
    this.toggle = !this.toggle;
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.cancelScan.emit();
  }

  getInputValue() {
    setTimeout(() => {
      this.scanModal.emit(this.barCode);
    }, 100);
    this.visible = false;
  }
}
