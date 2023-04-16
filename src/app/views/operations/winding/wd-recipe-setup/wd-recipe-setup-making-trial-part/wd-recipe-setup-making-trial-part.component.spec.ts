import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdRecipeSetupMakingTrialPartComponent } from './wd-recipe-setup-making-trial-part.component';

describe('WdRecipeSetupMakingTrialPartComponent', () => {
  let component: WdRecipeSetupMakingTrialPartComponent;
  let fixture: ComponentFixture<WdRecipeSetupMakingTrialPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdRecipeSetupMakingTrialPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdRecipeSetupMakingTrialPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
