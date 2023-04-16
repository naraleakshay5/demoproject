import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiRecipeSetupComponent } from './aoi-recipe-setup.component';

describe('AoiRecipeSetupComponent', () => {
  let component: AoiRecipeSetupComponent;
  let fixture: ComponentFixture<AoiRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
