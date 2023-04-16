import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemRecipeSetupComponent } from './tem-recipe-setup.component';

describe('TemRecipeSetupComponent', () => {
  let component: TemRecipeSetupComponent;
  let fixture: ComponentFixture<TemRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
