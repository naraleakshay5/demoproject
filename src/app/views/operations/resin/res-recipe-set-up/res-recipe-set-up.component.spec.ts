import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResRecipeSetUpComponent } from './res-recipe-set-up.component';

describe('ResRecipeSetUpComponent', () => {
  let component: ResRecipeSetUpComponent;
  let fixture: ComponentFixture<ResRecipeSetUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResRecipeSetUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResRecipeSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
