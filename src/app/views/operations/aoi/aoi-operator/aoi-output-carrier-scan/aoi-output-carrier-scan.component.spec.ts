import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiOutputCarrierScanComponent } from './aoi-output-carrier-scan.component';

describe('AoiOutputCarrierScanComponent', () => {
  let component: AoiOutputCarrierScanComponent;
  let fixture: ComponentFixture<AoiOutputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiOutputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiOutputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
