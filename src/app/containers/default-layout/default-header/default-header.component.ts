import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faArrowLeft,
  faBell,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { HelperService } from 'src/app/helpers/helper.service';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  public icons = {
    arrowLeft: faArrowLeft,
    bell: faBell,
    circleQuestion: faCircleQuestion,
  };

  cookieValue: any;
  userData: any;
  isLoggedIn: boolean = false;
  url: any;

  clickEventsubscription!: Subscription;
  processId: any;
  webClientProfile!: {
    id: number;
    name: string;
    url: string;
  };
  currentUser: any;

  constructor(
    private helperService: HelperService,
    private _cookieService: CookieService,
    private router: Router,
    private appStorage: AppStorage
  ) {
    super();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        let res = JSON.stringify(event);
        this.url = JSON.parse(res);

        const token = this._cookieService.get('token');
        if (token) {
          this.isLoggedIn = true;
        }
      });

    this.clickEventsubscription = this.helperService
      .getClickEvent()
      .subscribe(() => {
        this.logout();
        this.currentUser = this.appStorage.get('USER_DATA');
      });
  }
  ngOnInit(): void {
    const token = this._cookieService.get('token');
    if (token) {
      this.isLoggedIn = true;
    }
    this.processId = this.appStorage.get('PROCESS_ID');
    this.webClientProfile = this.appStorage.get('WEB_CLIENT') || '';
    this.currentUser = this.appStorage.get('USER_DATA');
  }

  logout() {
    this._cookieService.delete('token');
    this.appStorage.clear('token');
    this.appStorage.clear('USER_DATA');
    this.appStorage.clear('TEM_WD_WINDING');
    // this.appStorage.clear('BTNS_QUALITY_CHECK');
    this.appStorage.clear('TEM_SPC_SCHEDULE');
    this.appStorage.clear('METAL_TRAYS');
    this.appStorage.clear('RECIPE_LOADED_FOR_PO');
    this.isLoggedIn = false;
    this.helperService.polistPublic();
    this.router.navigate(['/po-list']);
  }

  ngOnDestroy() {
    this.clickEventsubscription.unsubscribe();
  }
}
