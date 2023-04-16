import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-heating',
  templateUrl: './pre-heating.component.html',
  styleUrls: ['./pre-heating.component.scss'],
})
export class PreHeatingComponent implements OnInit {
  progress = 95;
  isProgressCompleted: boolean = false;
  isCheck: boolean = false;
  isCheckOut: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  incrementTheProgress() {
    this.progress++;
    if (this.progress == 100) {
      this.isProgressCompleted = true;
    }
  }
  checkIn() {
    this.isCheck = true;
  }
  checkOut() {
    this.router.navigate(['/training/hot-press/hotPress']);
  }

  onCheck(event: any) {
    this.isCheckOut = event.target.checked;
  }
}
