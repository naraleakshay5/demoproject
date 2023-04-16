import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsCuringRecipeSetupComponent } from './as-curing-recipe-setup.component';

describe('AsCuringRecipeSetupComponent', () => {
  let component: AsCuringRecipeSetupComponent;
  let fixture: ComponentFixture<AsCuringRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsCuringRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsCuringRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
