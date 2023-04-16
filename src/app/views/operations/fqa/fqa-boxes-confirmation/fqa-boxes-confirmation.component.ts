import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { FqaService } from '../fqa.service';

@Component({
  selector: 'app-fqa-boxes-confirmation',
  templateUrl: './fqa-boxes-confirmation.component.html',
  styleUrls: ['./fqa-boxes-confirmation.component.scss'],
})
export class FqaBoxesConfirmationComponent implements OnInit {
  isdisabled: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {}

  proceed() {
    const reqBody = {
      po_id: this.appStorage.get('PO_DATA').po_id,
      machine_id: this.appStorage.get('MACHINE_ID'),
      stage: this.fqaService.fqaProcessLog.secondMechanical,
    };

    this.fqaService.postFqaProcessLog(reqBody).subscribe((res: any) => {
      this.router.navigate(['/po-list']);
      this.appStorage.clear('INSPECTORTYPE');
      this.appStorage.clear('TYPE');
    });
  }

  onCheck(event: any) {
    this.isdisabled = event.target.checked;
  }
}
