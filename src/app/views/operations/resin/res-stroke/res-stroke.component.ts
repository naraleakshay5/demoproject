import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res-stroke',
  templateUrl: './res-stroke.component.html',
  styleUrls: ['./res-stroke.component.scss'],
})
export class ResStrokeComponent implements OnInit {
  weight: number = 0;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/res']);
  }

  focusOut() {}
}
