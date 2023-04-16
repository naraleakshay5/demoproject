import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpRecipeSetupComponent } from './tp-recipe-setup.component';

describe('TpRecipeSetupComponent', () => {
  let component: TpRecipeSetupComponent;
  let fixture: ComponentFixture<TpRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
