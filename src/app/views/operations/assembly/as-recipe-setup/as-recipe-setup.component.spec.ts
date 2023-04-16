import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsRecipeSetupComponent } from './as-recipe-setup.component';

describe('AsRecipeSetupComponent', () => {
  let component: AsRecipeSetupComponent;
  let fixture: ComponentFixture<AsRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
