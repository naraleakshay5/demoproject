import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dd-start-operations',
  templateUrl: './dd-start-operations.component.html',
  styleUrls: ['./dd-start-operations.component.scss'],
})
export class DdStartOperationsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  startTheProcess() {
    this.router.navigate(['op/dd/operations']);
  }
}
