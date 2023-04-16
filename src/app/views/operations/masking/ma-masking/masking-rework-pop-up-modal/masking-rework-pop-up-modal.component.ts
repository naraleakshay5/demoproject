import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-masking-rework-pop-up-modal',
  templateUrl: './masking-rework-pop-up-modal.component.html',
  styleUrls: ['./masking-rework-pop-up-modal.component.scss'],
})
export class MaskingReworkPopUpModalComponent implements OnInit {
  @Input() title: any;
  @Input() text: any;
  @Input() text2: any;
  @Input() confirm: any;
  @Input() rework: any;
  @Output() modalCheck = new EventEmitter();
  @Output() reworkCheck = new EventEmitter();
  @Output() modalCheckCacelled = new EventEmitter();

  visible = true;

  constructor() {}

  ngOnInit(): void {}

  modalConfirmed() {
    this.modalCheck.emit();
    this.visible = false;
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.modalCheckCacelled.emit();
  }

  reworkConfirmed() {
    this.reworkCheck.emit();
    this.visible = false;
  }
}
