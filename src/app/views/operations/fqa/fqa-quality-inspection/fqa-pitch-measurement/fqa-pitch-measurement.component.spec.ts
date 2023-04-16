import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaPitchMeasurementComponent } from './fqa-pitch-measurement.component';

describe('FqaPitchMeasurementComponent', () => {
  let component: FqaPitchMeasurementComponent;
  let fixture: ComponentFixture<FqaPitchMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaPitchMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaPitchMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
