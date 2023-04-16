import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpIPCarrierScanComponent } from './hp-ipcarrier-scan.component';

describe('HpIPCarrierScanComponent', () => {
  let component: HpIPCarrierScanComponent;
  let fixture: ComponentFixture<HpIPCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpIPCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpIPCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
