import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineInputCarrierScanComponent } from './offline-input-carrier-scan.component';

describe('OfflineInputCarrierScanComponent', () => {
  let component: OfflineInputCarrierScanComponent;
  let fixture: ComponentFixture<OfflineInputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineInputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineInputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
