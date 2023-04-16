import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaRecipeComponent } from './ma-recipe.component';

describe('MaRecipeComponent', () => {
  let component: MaRecipeComponent;
  let fixture: ComponentFixture<MaRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
