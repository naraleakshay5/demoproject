import { AoiService } from '../aoi.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';

@Component({
  selector: 'app-aoi-tool-check',
  templateUrl: './aoi-tool-check.component.html',
  styleUrls: ['./aoi-tool-check.component.scss'],
})
export class AoiToolCheckComponent implements OnInit {
  tools: any;
  isToolAllSelected: boolean = false;
  toolsList: any;
  poData!: PO_DATA;
  leadSpace: any[] = [];
  processId!: number;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private aoiService: AoiService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    this.getTools();
    this.getLeadSpace();
  }

  getTools() {
    this.poData = this.appStorage.get('PO_DATA');
    this.processId = this.appStorage.get('PROCESS_ID');

    this.aoiService.getTools(this.processId, this.poData?.sach_id).subscribe({
      next: (resp: any) => {
        this.toolsList = resp.data.map((key: any) => ({
          ...key,
          selected_value: null,
          isChecked: null,
        }));
      },
    });
  }

  getLeadSpace() {
    this.aoiService.getLeadSpace().subscribe({
      next: (resp: any) => {
        this.leadSpace = resp.data;
      },
    });
  }

  onToolSelected(value: any, item: any) {
    item.isTouched = true;

    if (value == item.value) {
      item.isChecked = true;
    } else {
      item.isChecked = false;
      this.isToolAllSelected = false;
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
    this.router.navigate(['op/aoi/recipe-setup']);
  }
}
