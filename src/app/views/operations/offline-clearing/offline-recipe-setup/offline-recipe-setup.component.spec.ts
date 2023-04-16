import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineRecipeSetupComponent } from './offline-recipe-setup.component';

describe('OfflineRecipeSetupComponent', () => {
  let component: OfflineRecipeSetupComponent;
  let fixture: ComponentFixture<OfflineRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
