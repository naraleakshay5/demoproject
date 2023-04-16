import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaQualityInspectionComponent } from './fqa-quality-inspection.component';

describe('FqaQualityInspectionComponent', () => {
  let component: FqaQualityInspectionComponent;
  let fixture: ComponentFixture<FqaQualityInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaQualityInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaQualityInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
