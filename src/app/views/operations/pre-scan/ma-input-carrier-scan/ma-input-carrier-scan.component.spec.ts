import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaInputCarrierScanComponent } from './ma-input-carrier-scan.component';

describe('MaInputCarrierScanComponent', () => {
  let component: MaInputCarrierScanComponent;
  let fixture: ComponentFixture<MaInputCarrierScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaInputCarrierScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaInputCarrierScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
