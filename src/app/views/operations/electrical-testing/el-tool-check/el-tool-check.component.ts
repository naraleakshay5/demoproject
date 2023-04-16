import { PoData } from './../../masking/masking-model';
import { AppStorage } from './../../../../storage.service';
import { ElTestingService } from './../el-testing.service';
import { SharedService } from './../../Shared/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-el-tool-check',
  templateUrl: './el-tool-check.component.html',
  styleUrls: ['./el-tool-check.component.scss'],
})
export class ElToolCheckComponent implements OnInit {
  tools: any;
  isToolAllSelected: boolean = false;
  toolsList: any;
  poData!: PoData;
  leadSpace: any[] = [];
  processId!: number;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private testingService: ElTestingService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.getTools();
    this.getLeadSpace();
  }

  getTools() {
    this.poData = this.appStorage.get('PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.testingService
      .getTools(this.processId, this.poData?.sach_id)
      .subscribe({
        next: (resp: any) => {
          this.toolsList = resp.data[0].value.map((key: any) => ({
            ...key,
            selected_value: null,
            isChecked: null,
          }));
        },
      });
  }

  getLeadSpace() {
    this.testingService.getLeadSpace().subscribe({
      next: (resp: any) => {
        this.leadSpace = resp.data;
      },
    });
  }

  onToolSelected(value: any, item: any, type?: any) {
    item.isTouched = true;

    if (value == item.value) {
      item.isChecked = true;
    } else {
      item.isChecked = false;
    }

    let count = 0;
    this.toolsList.forEach((element: any) => {
      if (element.isChecked == true) {
        count++;
        if (count == this.toolsList.length) {
          this.isToolAllSelected = true;
        } else {
          this.isToolAllSelected = false;
        }
      }
    });
  }

  onSubmit() {
    this.sharedService.sentClickEventpoStageCompleted('tool-check');
    this.router.navigate(['op/el/recipe-setup']);
  }
}
