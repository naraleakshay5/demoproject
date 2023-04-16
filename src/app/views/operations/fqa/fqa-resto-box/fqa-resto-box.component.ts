import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fqa-resto-box',
  templateUrl: './fqa-resto-box.component.html',
  styleUrls: ['./fqa-resto-box.component.scss'],
})
export class FqaRestoBoxComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/fqa/scanned-resto-box']);
  }
}
