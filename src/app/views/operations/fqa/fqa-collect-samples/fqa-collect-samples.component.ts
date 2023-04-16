import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fqa-collect-samples',
  templateUrl: './fqa-collect-samples.component.html',
  styleUrls: ['./fqa-collect-samples.component.scss'],
})
export class FqaCollectSamplesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  manualTesting() {
    this.router.navigate(['op/fqa/impulse-test'], {
      queryParams: {
        type: 'manul',
      },
    });
  }

  automaticTesting() {
    this.router.navigate(['op/fqa/impulse-test'], {
      queryParams: {
        type: 'auto',
      },
    });
  }
}
