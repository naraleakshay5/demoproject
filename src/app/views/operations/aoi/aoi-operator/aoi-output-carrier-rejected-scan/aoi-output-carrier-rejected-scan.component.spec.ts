import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiOutputCarrierRejectedScanComponent } from './aoi-output-carrier-rejected-scan.component';

describe('AoiOutputCarrierRejectedScanComponent', () => {
  let component: AoiOutputCarrierRejectedScanComponent;
  let fixture: ComponentFixture<AoiOutputCarrierRejectedScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiOutputCarrierRejectedScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiOutputCarrierRejectedScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
