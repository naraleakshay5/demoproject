import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() title: any;
  @Input() text: any;
  @Input() text2: any;
  @Input() confirm: any;
  @Input() cancel: any;
  @Output() modalCheck = new EventEmitter();

  visible = true;

  constructor() {}

  ngOnInit(): void {}

  modalConfirmed() {
    this.modalCheck.emit();
    this.visible = false;
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.modalConfirmed();
  }
}
