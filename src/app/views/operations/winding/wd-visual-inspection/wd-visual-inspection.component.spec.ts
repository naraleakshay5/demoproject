import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdVisualInspectionComponent } from './wd-visual-inspection.component';

describe('WdVisualInspectionComponent', () => {
  let component: WdVisualInspectionComponent;
  let fixture: ComponentFixture<WdVisualInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdVisualInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdVisualInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
