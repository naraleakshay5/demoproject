import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReworkRecipeComponent } from './dd-rework-recipe.component';

describe('DdReworkRecipeComponent', () => {
  let component: DdReworkRecipeComponent;
  let fixture: ComponentFixture<DdReworkRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdReworkRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReworkRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
