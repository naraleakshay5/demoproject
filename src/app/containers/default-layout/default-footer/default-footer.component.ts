import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { HelperService } from 'src/app/helpers/helper.service';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent
  extends FooterComponent
  implements OnInit, OnDestroy
{
  intervalDateTime: any = null;
  currentTime: any = null;

  constructor(private helperService: HelperService) {
    super();
  }

  ngOnInit(): void {
    this.intervalDateTime = setInterval(() => {
      this.currentTime = this.helperService.getNowTimeFormatted();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalDateTime);
  }
}
