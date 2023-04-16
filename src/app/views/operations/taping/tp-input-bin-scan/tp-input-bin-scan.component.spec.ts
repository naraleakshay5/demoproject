import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpInputBinScanComponent } from './tp-input-bin-scan.component';

describe('TpInputBinScanComponent', () => {
  let component: TpInputBinScanComponent;
  let fixture: ComponentFixture<TpInputBinScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpInputBinScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpInputBinScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
