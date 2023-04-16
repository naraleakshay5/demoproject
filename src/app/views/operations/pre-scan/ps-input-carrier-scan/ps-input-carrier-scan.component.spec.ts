import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsInputCarrierScanComponent } from './ps-input-carrier-scan.component';

describe('PsInputCarrierScanComponent', () => {
  let component: PsInputCarrierScanComponent;
  let fixture: ComponentFixture<PsInputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsInputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsInputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
