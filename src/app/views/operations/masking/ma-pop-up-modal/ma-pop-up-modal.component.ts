import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ma-pop-up-modal',
  templateUrl: './ma-pop-up-modal.component.html',
  styleUrls: ['./ma-pop-up-modal.component.scss'],
})
export class MaPopUpModalComponent implements OnInit {
  @Input() title: any;
  @Input() text: any;
  @Input() text2: any;
  @Input() confirm: any;
  @Input() cancel: any;
  @Output() modalCheck = new EventEmitter();
  @Output() modalCheckCacelled = new EventEmitter();
  reworkType: string = '';

  visible = true;
  isMajor: boolean = false;
  isMinor: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  modalConfirmed() {
    this.modalCheck.emit(this.reworkType);
    this.visible = false;
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.modalCheckCacelled.emit();
  }

  minor() {
    this.reworkType = 'minor';
    this.isMinor = true;
    this.isMajor = false;
  }

  major() {
    this.reworkType = 'major';
    this.isMajor = true;
    this.isMinor = false;
  }
}
