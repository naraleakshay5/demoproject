import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../Shared/shared.service';

@Component({
  selector: 'app-aoi-dry-run',
  templateUrl: './aoi-dry-run.component.html',
  styleUrls: ['./aoi-dry-run.component.scss'],
})
export class AoiDryRunComponent implements OnInit {
  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {}

  proceed() {
    this.sharedService.sentClickEventpoStageCompleted('dry-run');
    this.router.navigate(['op/aoi/output-rejected-bin']);
  }
}
