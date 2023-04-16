import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineOutputCarrierScanComponent } from './offline-output-carrier-scan.component';

describe('OfflineOutputCarrierScanComponent', () => {
  let component: OfflineOutputCarrierScanComponent;
  let fixture: ComponentFixture<OfflineOutputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineOutputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineOutputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
