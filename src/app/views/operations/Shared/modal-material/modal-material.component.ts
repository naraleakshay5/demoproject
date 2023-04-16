import { Title } from '@angular/platform-browser';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PO_DATA } from '../shared-model';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-modal-material',
  templateUrl: './modal-material.component.html',
  styleUrls: ['./modal-material.component.scss'],
})
export class ModalMaterialComponent implements OnInit {
  @Input() title: any;
  @Input() text: any;
  @Input() confirm: any;
  @Output() materialModalCheck = new EventEmitter();
  @Output() materialModalCheckCancelled = new EventEmitter();

  visible = true;
  constructor(private appStorage: AppStorage) {}

  ngOnInit(): void {}

  materialModalCheckFunction() {
    this.materialModalCheck.emit();
  }

  modalConfirmed() {
    this.materialModalCheck.emit();
    this.visible = false;
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.materialModalCheckCancelled.emit();
  }
}
