import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-l2',
  templateUrl: './spinner-l2.component.html',
  styleUrls: ['./spinner-l2.component.css'],
})
export class SpinnerL2Component implements OnInit {
  @Input() progress_text!: string;
  @Input() size!: string;

  ngOnInit() {
    this.size = this.size || 'medium';
  }
}
