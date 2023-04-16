import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warning-pop-up-modal',
  templateUrl: './warning-pop-up-modal.component.html',
  styleUrls: ['./warning-pop-up-modal.component.scss'],
})
export class WarningPopUpModalComponent implements OnInit {
  @Input() title!: string;
  @Input() text1!: string;
  @Input() text2!: string;
  @Input() text3!: string;
  @Input() confirm!: string;
  @Input() cancel!: string;
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
