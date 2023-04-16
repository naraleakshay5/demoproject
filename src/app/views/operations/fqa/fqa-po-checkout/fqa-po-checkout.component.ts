import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { FqaService } from '../fqa.service';

@Component({
  selector: 'app-fqa-po-checkout',
  templateUrl: './fqa-po-checkout.component.html',
  styleUrls: ['./fqa-po-checkout.component.scss'],
})
export class FqaPoCheckoutComponent implements OnInit {
  inspectorType: string | null = '';
  mechInspection: boolean = false;
  isdisabled: boolean = false;
  fqaProcessLog: any;
  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private fqaService: FqaService
  ) {}

  ngOnInit(): void {
    this.inspectorType = this.appStorage.get('INSPECTORTYPE');
    this.fqaProcessLog = this.fqaService.fqaProcessLog;
  }

  proceed() {
    let stage = '';
    if (this.inspectorType === this.fqaProcessLog.electrical) {
      stage = this.fqaProcessLog.electrical;
    } else if (this.inspectorType === this.fqaProcessLog.firstMechanical) {
      stage = this.fqaProcessLog.firstMechanical;
    } else if (this.inspectorType === this.fqaProcessLog.packing) {
      stage = this.fqaProcessLog.packing;
    } else if (
      this.inspectorType === this.fqaProcessLog.tapingMechanicalCompleted
    ) {
      stage = this.fqaProcessLog.tapingMechanicalCompleted;
    }

    const reqBody = {
      po_id: this.appStorage.get('PO_DATA').po_id,
      machine_id: this.appStorage.get('MACHINE_ID'),
      stage: stage,
    };

    this.fqaService.postFqaProcessLog(reqBody).subscribe((res: any) => {
      this.router.navigate(['/po-list']);
      this.appStorage.clear('INSPECTORTYPE');
    });
  }

  onCheck(event: any) {
    this.isdisabled = event.target.checked;
  }
}
