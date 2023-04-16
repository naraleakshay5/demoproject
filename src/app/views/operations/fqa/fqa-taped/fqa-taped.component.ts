import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fqa-taped',
  templateUrl: './fqa-taped.component.html',
  styleUrls: ['./fqa-taped.component.scss'],
})
export class FqaTapedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/fqa/quality-inspection']);
    localStorage.setItem('TYPE', 'taped');
  }
}
