import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaRestoBoxVisualInspectionComponent } from './fqa-resto-box-visual-inspection.component';

describe('FqaRestoBoxVisualInspectionComponent', () => {
  let component: FqaRestoBoxVisualInspectionComponent;
  let fixture: ComponentFixture<FqaRestoBoxVisualInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaRestoBoxVisualInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaRestoBoxVisualInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
