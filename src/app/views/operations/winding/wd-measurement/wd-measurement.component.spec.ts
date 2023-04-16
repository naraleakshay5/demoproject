import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdMeasurementComponent } from './wd-measurement.component';

describe('WdMeasurementComponent', () => {
  let component: WdMeasurementComponent;
  let fixture: ComponentFixture<WdMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
