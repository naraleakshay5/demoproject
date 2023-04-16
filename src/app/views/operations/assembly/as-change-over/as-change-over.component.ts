import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';
import { PO_DATA } from '../../Shared/shared-model';
import { SharedService } from '../../Shared/shared.service';
import { poData } from '../assembly-model';
import { AssemblyService } from '../assembly.service';

@Component({
  selector: 'app-as-change-over',
  templateUrl: './as-change-over.component.html',
  styleUrls: ['./as-change-over.component.scss'],
})
export class AsChangeOverComponent implements OnInit {
  isNext: boolean = false;
  isChangeOver: boolean = false;
  isToolAllSelected: boolean = false;
  tools: any;
  wicPoData!: PO_DATA;
  requiredTools: any;

  constructor(
    private router: Router,
    private assemblyService: AssemblyService,
    private sharedService: SharedService,
    private appStorage: AppStorage
  ) {}

  changeOverEle = [
    { element: 'Box', is_true: false },
    { element: 'Lead Space', is_true: false },
    { element: 'cap value', is_true: false },
    { element: 'Batch', is_true: false },
    { element: 'Lead length', is_true: false },
  ];

  typeOf(value: any, type: string = '') {
    return typeof value;
  }

  ngOnInit(): void {
    this.wicPoData = this.appStorage.get('WIC_PO_DATA');

    this.getTools();
  }

  getTools() {
    this.assemblyService
      .getTools(this.wicPoData.sach_id)
      .subscribe((res: any) => {
        this.tools = res.data.tools.map((key: any) => ({
          ...key,
          selected_value: null,
          isChecked: null,
        }));
        this.requiredTools = res.data?.requiredTools[0];
        var result = Object.keys(this.requiredTools).map((key) => [
          String(key),
          this.requiredTools[key],
        ]);
        this.tools = res.data.tools
          .filter((el: any) => el.value != null && el.value != '')
          .map((ele: any) => {
            result.forEach((e: any, i: number) => {
              if (ele.value == e[0]) {
                (ele.selected_value = e[1]), (ele.isChecked = false);
              }
            });
            return ele;
          });
      });
  }

  changeOver(item: any) {
    if (item.element == 'Batch') {
      this.isChangeOver = true;
    }
  }

  onNext() {
    this.isNext = true;
  }
  onSubmit() {
    this.router.navigate(['op/as/material-check']);
    this.assemblyService.sentClickEventpoStageCompleted(
      'change-over',
      this.wicPoData.po_id
    );
  }

  onToolSelected(value: any, item: any, type?: any) {
    item.isTouched = true;

    if (type == 'object') {
      item.isChecked = true;
    } else {
      if (value == item?.selected_value) {
        item.isChecked = true;
      } else {
        item.isChecked = false;
      }
    }

    let count = 0;
    this.tools.forEach((element: any) => {
      if (element.isChecked == true) {
        count++;
        if (count == this.tools.length) {
          this.isToolAllSelected = true;
        } else {
          this.isToolAllSelected = false;
        }
      }
    });
  }
}
