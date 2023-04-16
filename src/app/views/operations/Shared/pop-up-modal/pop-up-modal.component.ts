import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.scss'],
})
export class PopUpModalComponent implements OnInit {
  @Input() title: any;
  @Input() text: any;
  @Input() text2: any;
  @Input() confirm: any;
  @Input() cancel: any;
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
