import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdRecipeSetupComponent } from './dd-recipe-setup.component';

describe('DdRecipeSetupComponent', () => {
  let component: DdRecipeSetupComponent;
  let fixture: ComponentFixture<DdRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
