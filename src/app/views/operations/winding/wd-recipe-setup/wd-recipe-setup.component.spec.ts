import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdRecipeSetupComponent } from './wd-recipe-setup.component';

describe('WdRecipeSetupComponent', () => {
  let component: WdRecipeSetupComponent;
  let fixture: ComponentFixture<WdRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
