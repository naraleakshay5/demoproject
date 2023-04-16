import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiInputCarrierScanComponent } from './aoi-input-carrier-scan.component';

describe('AoiInputCarrierScanComponent', () => {
  let component: AoiInputCarrierScanComponent;
  let fixture: ComponentFixture<AoiInputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiInputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiInputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
