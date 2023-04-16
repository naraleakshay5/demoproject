import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdRecipeSetupVisualInspectionComponent } from './wd-recipe-setup-visual-inspection.component';

describe('WdRecipeSetupVisualInspectionComponent', () => {
  let component: WdRecipeSetupVisualInspectionComponent;
  let fixture: ComponentFixture<WdRecipeSetupVisualInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdRecipeSetupVisualInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdRecipeSetupVisualInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
