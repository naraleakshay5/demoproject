import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsDispensarRecipeSetupComponent } from './as-dispensar-recipe-setup.component';

describe('AsDispensarRecipeSetupComponent', () => {
  let component: AsDispensarRecipeSetupComponent;
  let fixture: ComponentFixture<AsDispensarRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsDispensarRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsDispensarRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
