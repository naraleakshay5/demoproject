import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-pop-up-modal',
  templateUrl: './success-pop-up-modal.component.html',
  styleUrls: ['./success-pop-up-modal.component.scss'],
})
export class SuccessPopUpModalComponent implements OnInit {
  @Input() title!: string;
  @Input() text!: string;
  @Input() confirm!: string;
  @Output() modalCheck = new EventEmitter();
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
}
