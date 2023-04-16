import { environment } from 'src/environments/environment.demo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { CookieService } from 'ngx-cookie-service';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  wcname: any;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private _cookieService: CookieService,
    private appStorage: AppStorage
  ) {}

  ngOnInit(): void {
    // localStorage.clear();
    if (environment.isTraining === true) {
      this.router.navigate(['training']);
    } else {
      this.cleanLocalStorage();
      this.getWebClientProfile();
    }
  }

  getWebClientProfile() {
    this.commonService.getWebClientProfile().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          let count = 0;
          if (response.data && response.data.web_client) {
            count++;
            this.appStorage.set('WEB_CLIENT', response.data.web_client);
          }

          if (response.data && response.data.machines) {
            count++;
            this.appStorage.set('MACHINE', response.data.machines);
            const machine = response.data.machines.find(
              (ele: any) => ele.is_primary == true
            );
            this.appStorage.set('MACHINE_ID', machine.id);
          }

          if (response.data && response.data.station) {
            count++;
            this.appStorage.set('STATION', response.data.station);
            this.appStorage.set('PROCESS_ID', response.data.station.id);
            this.wcname = response.data.station.name;
          }

          if (response?.data?.machine_tags?.product_recipe_running_parameters) {
            this.appStorage.set(
              'product_recipe_running_parameters',
              response.data.machine_tags.product_recipe_running_parameters
            );
          }

          if (response?.data?.machine_tags?.product_recipe_set_parameters) {
            this.appStorage.set(
              'product_recipe_set_parameters',
              response.data.machine_tags.product_recipe_set_parameters
            );
          }

          if (count === 3) {
            this.operationalModule();
          }
        }
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  operationalModule() {
    if (this.appStorage.get('STATION').process_slug === 'resin') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/po-list']);
    }
  }

  cleanLocalStorage() {
    this._cookieService.delete('token');
    this.appStorage.clear('token');
    this.appStorage.clear('USER_DATA');
    this.appStorage.clear('TEM_WD_WINDING');
    this.appStorage.clear('RECIPE_LOADED_FOR_PO');
    // this.appStorage.clear('BTNS_QUALITY_CHECK');
  }
}
