import { SharedService } from './../../Shared/shared.service';
import { AppStorage } from './../../../../storage.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-el-video-jet-image',
  templateUrl: './el-video-jet-image.component.html',
  styleUrls: ['./el-video-jet-image.component.scss'],
})
export class ElVideoJetImageComponent implements OnInit {
  // @ViewChild('vj_side') monitoringAllSide!: ElementRef;
  // @ViewChild('vj_top') monitoringAllTop!: ElementRef;
  // public ctxSide!: CanvasRenderingContext2D;
  // public ctxTop!: CanvasRenderingContext2D;
  // json: any;
  urlSide!: string;
  urlTop!: string;
  urlSafeSide: SafeResourceUrl | undefined;
  urlSafeTop: SafeResourceUrl | undefined;
  // isPoChecked: boolean = false;
  isVjVerified!: boolean;
  isTopMatterChecked: boolean = false;
  isSideMatterChecked: boolean = false;
  isOperationStarted: boolean = false;
  allChecked: boolean = false;
  enableModal: boolean = false;

  constructor(
    private router: Router,
    public sanitizer: DomSanitizer,
    private appStorage: AppStorage,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.isOperationStarted = this.appStorage.get('IS_OPERATION_STARTED');
    this.isVjVerified = this.appStorage.get('VJ_VERIFIED');
    this.urlSide = 'http://172.26.60.224/';
    this.urlTop = 'http://172.26.60.223/';
    this.urlSafeSide = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlSide
    );
    this.urlSafeTop = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlTop
    );
    this.checkAllStatus();
    // this.json = this.appStorage.get('JSON');
  }

  checkAllStatus() {
    this.allChecked =
      !this.isVjVerified && this.isTopMatterChecked && this.isSideMatterChecked;
  }

  report() {
    this.enableModal = true;
  }

  reportMaintenance() {}

  modalCanceled() {
    this.enableModal = false;
  }

  // ngAfterViewInit() {
  //   // this.ctxSide = this.monitoringAllSide.nativeElement.getContext('2d');
  //   // this.ctxTop = this.monitoringAllTop.nativeElement.getContext('2d');
  //   // this.drawSideImage();
  //   // this.drawTopImage();
  // }

  // drawSideImage() {
  //   const bH = this.monitoringAllSide.nativeElement.height;
  //   const imgHeight = bH - 180;
  //   const imgWidth = bH;

  //   console.log(imgWidth, imgHeight);

  //   this.drawImageSide(0, 0, imgWidth, imgHeight);

  //   this.ctxSide.save();
  // }

  // drawTopImage() {
  //   const bH = this.monitoringAllTop.nativeElement.height;
  //   const imgHeight = bH;
  //   const imgWidth = bH;

  //   console.log(imgWidth, imgHeight);

  //   this.drawImageTop(0, 0, imgWidth, imgHeight);

  //   this.ctxTop.save();
  // }

  // erase(imgWidth: number, imgHeight: number) {
  //   this.ctxSide.beginPath();
  //   this.ctxSide.rect(0, 0, imgWidth, imgHeight - imgHeight * (2.8 / 5));
  //   this.ctxSide.fillStyle = 'white';
  //   this.ctxSide.fill();
  //   this.ctxSide.save();
  //   this.writeSideText(imgWidth, imgHeight);
  // }

  // eraseTop(imgWidth: number, imgHeight: number) {
  //   this.ctxTop.beginPath();
  //   this.ctxTop.rect(
  //     imgWidth,
  //     0,
  //     -(imgWidth - imgWidth * (1.8 / 5)),
  //     imgHeight
  //   );
  //   this.ctxTop.fillStyle = 'white';
  //   this.ctxTop.fill();
  //   this.ctxTop.save();
  //   this.writeTopText(imgWidth, imgHeight);
  // }

  // writeSideText(imgWidth: number, imgHeight: number) {
  //   this.ctxSide.font = '36px arial';
  //   this.ctxSide.textAlign = 'right';
  //   this.ctxSide.fillStyle = 'black';
  //   // this.ctxSide.fillText('B32923 X2 MKP/SH', imgWidth * 0.9, imgHeight * 0.2);
  //   this.ctxSide.fillText(
  //     this.json?.SideLine1,
  //     imgWidth * 0.9,
  //     imgHeight * 0.2
  //   );

  //   this.ctxSide.font = '36px arial';
  //   this.ctxSide.textAlign = 'right';
  //   this.ctxSide.fillStyle = 'black';
  //   // this.ctxSide.fillText('40/105/56/B', imgWidth * 0.9, imgHeight * 0.4);
  //   this.ctxSide.fillText(
  //     this.json?.SideLine2,
  //     imgWidth * 0.9,
  //     imgHeight * 0.4
  //   );
  // }

  // writeTopText(imgWidth: number, imgHeight: number) {
  //   this.ctxTop.font = '36px arial';
  //   this.ctxTop.textAlign = 'right';
  //   this.ctxTop.fillStyle = 'black';
  //   // this.ctxTop.fillText('N????????? C', imgWidth * 1.1, imgHeight * 0.45);
  //   this.ctxTop.fillText(this.json.TopLine1, imgWidth * 1, imgHeight * 0.45);

  //   this.ctxTop.font = '36px arial';
  //   this.ctxTop.textAlign = 'right';
  //   this.ctxTop.fillStyle = 'black';
  //   // this.ctxTop.fillText('XX-u33 M 305V#', imgWidth * 1.1, imgHeight * 0.55);
  //   this.ctxTop.fillText(this.json.TopLine2, imgWidth * 1.1, imgHeight * 0.55);
  // }

  // // drawRect(
  // //   x: number,
  // //   y: number,
  // //   height: number,
  // //   width: number = this.ctxSide.canvas.width
  // // ) {
  // //   const rectangle = new Path2D();
  // //   rectangle.rect(x, y, width, height);

  // //   this.ctxSide.stroke(rectangle);
  // // }

  // drawImageSide(
  //   imgX: number,
  //   imgY: number,
  //   imgWidth: number,
  //   imgHeight: number
  // ) {
  //   const img = new Image();

  //   img.onload = () => {
  //     this.ctxSide.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  //     this.erase(imgWidth, imgHeight);
  //   };

  //   img.src = '/assets/side_print.png';
  // }

  // drawImageTop(
  //   imgX: number,
  //   imgY: number,
  //   imgWidth: number,
  //   imgHeight: number
  // ) {
  //   const img = new Image();

  //   img.onload = () => {
  //     this.ctxTop.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  //     this.eraseTop(imgWidth, imgHeight);
  //   };

  //   img.src = '/assets/logo_epcos.jpg';
  // }

  // drawImageOnce(
  //   imgX: number,
  //   imgY: number,
  //   imageType: string,
  //   imgHeight: number
  // ) {
  //   const img = new Image();

  //   img.onload = () => {
  //     this.ctxSide.drawImage(img, imgX, imgY, imgHeight, imgHeight - 20);
  //   };

  //   img.src = '/assets/side_print.png';
  // }

  continue() {
    this.sharedService.sentClickEventpoStageCompleted('video-jet');
    this.router.navigate(['op/el/operations']);
  }

  checkTopMatter(event: any) {
    this.isTopMatterChecked = event.target.checked;
    this.checkAllStatus();
  }

  checkSideMatter(event: any) {
    this.isSideMatterChecked = event.target.checked;
    this.checkAllStatus();
  }
}
