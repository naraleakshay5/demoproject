import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdMachineRecipeSetupComponent } from './wd-machine-recipe-setup.component';

describe('WdMachineRecipeSetupComponent', () => {
  let component: WdMachineRecipeSetupComponent;
  let fixture: ComponentFixture<WdMachineRecipeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdMachineRecipeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdMachineRecipeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
