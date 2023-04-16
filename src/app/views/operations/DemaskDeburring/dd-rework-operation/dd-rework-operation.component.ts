import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dd-rework-operation',
  templateUrl: './dd-rework-operation.component.html',
  styleUrls: ['./dd-rework-operation.component.scss'],
})
export class DdReworkOperationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceed() {
    this.router.navigate(['op/dd/label-printing']);
  }
}
