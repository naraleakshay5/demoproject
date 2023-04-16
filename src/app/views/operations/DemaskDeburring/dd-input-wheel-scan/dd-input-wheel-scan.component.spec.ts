import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdInputWheelScanComponent } from './dd-input-wheel-scan.component';

describe('DdInputWheelScanComponent', () => {
  let component: DdInputWheelScanComponent;
  let fixture: ComponentFixture<DdInputWheelScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdInputWheelScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdInputWheelScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
