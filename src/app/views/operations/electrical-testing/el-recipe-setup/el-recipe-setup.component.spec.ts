import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElRecipeSetupComponent } from './el-recipe-setup.component';

describe('ElRecipeSetupComponent', () => {
  let component: ElRecipeSetupComponent;
  let fixture: ComponentFixture<ElRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
