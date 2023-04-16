import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batchcard',
  templateUrl: './batchcard.component.html',
  styleUrls: ['./batchcard.component.scss'],
})
export class BatchcardComponent implements OnInit {
  hideShow: boolean = true;
  componentCount: number = 0;
  isDisble: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  hideshow() {
    this.hideShow = !this.hideShow;
  }

  previous() {
    this.componentCount -= 1;
  }

  next() {
    this.componentCount += 1;
  }

  onSelect(value: any) {
    this.componentCount = value;
  }
}
