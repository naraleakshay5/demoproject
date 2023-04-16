import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpRecipeSetupComponent } from './hp-recipe-setup.component';

describe('HpRecipeSetupComponent', () => {
  let component: HpRecipeSetupComponent;
  let fixture: ComponentFixture<HpRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
