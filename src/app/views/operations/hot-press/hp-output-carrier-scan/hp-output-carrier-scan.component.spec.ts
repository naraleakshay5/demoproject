import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpOutputCarrierScanComponent } from './hp-output-carrier-scan.component';

describe('HpOutputCarrierScanComponent', () => {
  let component: HpOutputCarrierScanComponent;
  let fixture: ComponentFixture<HpOutputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpOutputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpOutputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
