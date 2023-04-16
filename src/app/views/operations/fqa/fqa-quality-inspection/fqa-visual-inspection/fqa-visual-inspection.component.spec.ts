import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaVisualInspectionComponent } from './fqa-visual-inspection.component';

describe('FqaVisualInspectionComponent', () => {
  let component: FqaVisualInspectionComponent;
  let fixture: ComponentFixture<FqaVisualInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaVisualInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaVisualInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
