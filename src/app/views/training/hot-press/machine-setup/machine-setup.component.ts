import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AppStorage } from 'src/app/storage.service';
import { Material } from 'src/app/views/operations/masking/masking-model';
import { environment } from 'src/environments/environment';
import { UrlService } from './url.service';
@Component({
  selector: 'app-machine-setup',
  templateUrl: './machine-setup.component.html',
  styleUrls: ['./machine-setup.component.scss'],
})
export class MachineSetupComponent implements OnInit {
  previousUrl: string = '';
  currentUrl: string = '';

  materialDetails: any = [
    {
      material_name: 'cello_tape_id',
      material_code: 'C1234',
      isChecked: false,
      required_size: 19,
      tape_size: [9, 12, 19, 24, 30, 48],
      tape_colors: ['white', 'yellow'],
    },
    {
      material_name: 'masking_tape',
      material_code: 'T1234',
      isChecked: false,
      required_size: 19,
      tape_size: [9, 12, 19, 24, 30, 48],
      tape_colors: ['brown', 'yellow'],
    },
  ];

  toolsList: any = [
    {
      tool_name: 'Element Guide Plate',
      required_value: 22.5,
      isChecked: false,
      leadSpace: [10, 15, 22.5, 27.5, 37.5],
    },
    {
      tool_name: 'Pusher',
      required_value: 22.5,
      isChecked: false,
      leadSpace: [10, 15, 22.5, 27.5, 37.5],
    },
  ];

  poData: any = [
    {
      po_number: '122879776',
      sach_number: 'B81123C1472M189',
      carriers: 100,
      ls: 22.5,
      target_quantity: 5000,
      bs: '',
      pmtDelay: '',
      isStart: false,
      isComplated: false,
    },
    // {
    //   po_number: '122879777',
    //   sach_number: 'B81123C1472M189',
    //   carriers: 90,
    //   target_quantity: 5000,
    //   ls: 22.5,
    //   bs: '',
    //   pmtDelay: '',
    //   isStart: false,
    //   isComplated: false,
    // },
    // {
    //   po_number: '122879778',
    //   sach: 'B81123C1472M189',
    //   carriers: 100,
    //   qty: 22.5,
    //   ls: '',
    //   bs: '',
    //   pmtDelay: '',
    //   isStart: false,
    //   isComplated: false,
    // },
  ];

  poDataToprocess: any[] = [];
  poDataInprocess: any[] = [];
  poDataPrehiting: any[] = [];
  startedPO: any[] = [];
  completedPo: any[] = [];
  preHit: boolean = false;
  isAllMaterialSelected: boolean = false;
  completeMaterialCheck: boolean = false;
  completeToolCheck: boolean = false;
  isToolAllSelected: boolean = false;
  completeMachineSetup: boolean = false;

  isRollerPressureChecked: boolean = false;
  isSpringAdjustmentChecked: boolean = false;
  isHammerSettingChecked: boolean = false;
  isTapePlateSettingChecked: boolean = false;
  isAllChecked: boolean = false;
  sizeCount!: number;
  isSizeSelected: boolean = false;
  isPoStarted: boolean = false;
  environment: any;
  orderInProcess: boolean = false;
  orderToProcess: boolean = true;
  constructor(
    private router: Router,
    private urlService: UrlService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    let element = ['10', '20', '30', '40', '50', '60', '70', '40'];
    const data = element.filter(
      (item, index) => element.indexOf(item) === index
    );
    console.log(data);

    // this.environment = environment;
    const po = this.appStorage.get('TEM_STARTED_POS');
    //localStorage.removeItem('TEM_STARTED_POS');

    console.log(po);

    if (po && po.length) {
      this.poDataToprocess = po.filter((ele: any) => ele.isStart === false);
      this.poDataInprocess = po.filter((ele: any) => ele.isStart === true);
    } else {
      this.startedPO = this.poData;
      this.poDataToprocess = this.poData.filter(
        (ele: any) => ele.isStart === false
      );
      // this.poDataPrehiting = this.poData.filter(
      //   (elt: any) => elt.isComplated == true,
      //   console.log(this.poDataPrehiting)
      // );
    }

    if (po && po.length) {
      // this.poDataInprocess = po.filter((ele: any) => ele.isStart === false);
      // this.poDataPrehiting = po.filter((ele: any) => ele.isComplated === true);
    } else {
      // this.startedPO = this.poData;
      // this.poDataToprocess = this.poData.filter(
      //   (ele: any) => ele.isStart === false
      // );
      // this.poDataPrehiting = this.poData.filter(
      //   (elt: any) => elt.isComplated == true,
      //   console.log(this.poDataPrehiting)
      // );

      console.log(this.poDataInprocess);
    }
    // if (po && po.length) {
    //   this.poDataInprocess = po.filter((ele: any) => ele.isStart === false);
    //   this.poDataPrehiting = po.filter((ele: any) => ele.isComplated === true);
    // }
    // console.log(this.poDataInprocess);
    // console.log(this.poDataInprocess[0].isStart);
    // console.log(this.poDataToprocess[0].isStart);
    // if (
    //   this.poDataToprocess[0].isStart == true ||
    //   this.poDataInprocess[0].isStart == true
    // ) {
    //   alert('preHit');
    // }
  }
  localStorage() {
    localStorage.removeItem('TEM_STARTED_POS');
    window.location.reload();
  }
  hotpressStarted(data: any) {
    //this.isPoStarted = true;
    this.startedPO = this.startedPO.map((ele: any) => {
      if (ele.po_number === data.po_number) {
        ele.isStart = true;
      }
      return ele;
    });

    this.setDataInLocalStorage(data);

    console.log(data);

    this.startedPO = [...this.startedPO];
    console.log(this.startedPO);

    this.appStorage.set('TEM_STARTED_POS', this.startedPO);

    this.router.navigate(['training/hot-press/offline-pre-press']);
  }

  continueHp(item: any) {
    this.setDataInLocalStorage(item);

    const lastUrl = this.appStorage.get('TEM_LAST_URL');
    if (lastUrl) {
      this.router.navigate(['training/hot-press/' + lastUrl]);
    } else {
      this.router.navigate(['training/hot-press/offline-pre-press']);
    }

    // console.log(item);

    // this.completedPo = this.completedPo.map((ele: any) => {
    //   if (ele.po_number === item.po_number) {
    //     ele.isComplated = true;
    //   }
    //   return ele;
    // });
    // this.completedPo = [...this.completedPo];
    // console.log(this.completedPo);
    // this.appStorage.set('TEM_STARTED_POS', this.completedPo);
  }

  preHeating() {
    this.router.navigate(['training/hot-press/pre-heating']);
    // const lastUrl = this.appStorage.get('TEM_LAST_URL');
    // if (lastUrl) {
    //   this.router.navigate(['training/hot-press/' + lastUrl]);
    // } else {
    //   this.router.navigate(['training/hot-press/offline-pre-press']);
    // }
  }

  onTapeColorSelected(value: string, item: Material) {
    item.isTouched = true;
    this.checkForAllScannedTools();
  }

  onTapeSizeSelected(value: string, item: any) {
    this.sizeCount = 0;
    if (value == item.required_size) {
      this.sizeCount++;
    }

    if (this.sizeCount >= 2) {
      this.isSizeSelected = true;
    }
  }

  checkForAllScannedTools() {
    let count = 0;
    this.materialDetails.forEach((element: any) => {
      if (element.isTouched == true) {
        count++;
        if (count == this.materialDetails.length) {
          this.isAllMaterialSelected = true;
        } else {
          this.isAllMaterialSelected = false;
        }
      }
    });
  }

  proceedToCompleteMaterialCheck() {
    this.completeMaterialCheck = true;
    this.completeToolCheck = true;
  }

  onToolSelected(value: any, item: any) {
    item.isTouched = true;

    if (value == item.required_value) {
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

  proceedToCompleteToolCheck() {
    this.completeToolCheck = false;
    this.completeMachineSetup = true;
  }

  checkRollerPressure(rollerPressure: any) {
    this.isRollerPressureChecked = rollerPressure.target.checked;
    this.isAllCheckChecked();
  }

  checkSpringAdjustment(springAdjustment: any) {
    this.isSpringAdjustmentChecked = springAdjustment.target.checked;
    this.isAllCheckChecked();
  }

  checkHammerSetting(hammerSetting: any) {
    this.isHammerSettingChecked = hammerSetting.target.checked;
    this.isAllCheckChecked();
  }

  checkTapePlateSetting(tapePlateSetting: any) {
    this.isTapePlateSettingChecked = tapePlateSetting.target.checked;
    this.isAllCheckChecked();
  }

  isAllCheckChecked() {
    if (
      this.isRollerPressureChecked &&
      this.isSpringAdjustmentChecked &&
      this.isHammerSettingChecked &&
      this.isTapePlateSettingChecked
    ) {
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
    }
  }

  proceedToCompletemachineSetup() {
    this.completeMachineSetup = true;
    this.router.navigate(['training/masking-recipe']);
  }

  setDataInLocalStorage(data: any) {
    this.appStorage.set('PO_DATA', {
      po_id: data.production_order_id,
      sach_id: data.sach_id,
      ls_id: data.ls_id,
      po_number: data.po_number,
      sach_number: data.sach_number,
      target_quantity: data.target_quantity,
      trolley_id: data.trolley_id,
    });
  }
}
