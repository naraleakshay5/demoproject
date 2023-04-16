import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineValidationChecklistComponent } from './machine-validation-checklist.component';

describe('MachineValidationChecklistComponent', () => {
  let component: MachineValidationChecklistComponent;
  let fixture: ComponentFixture<MachineValidationChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineValidationChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineValidationChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
