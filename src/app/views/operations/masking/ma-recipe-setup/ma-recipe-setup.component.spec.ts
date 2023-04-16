import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaRecipeSetupComponent } from './ma-recipe-setup.component';

describe('MaRecipeSetupComponent', () => {
  let component: MaRecipeSetupComponent;
  let fixture: ComponentFixture<MaRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
