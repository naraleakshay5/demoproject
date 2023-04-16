import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fqa-boxed',
  templateUrl: './fqa-boxed.component.html',
  styleUrls: ['./fqa-boxed.component.scss'],
})
export class FqaBoxedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/fqa/quality-inspection']);
    localStorage.setItem('TYPE', 'boxed');
  }
}
