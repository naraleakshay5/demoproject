import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineSetupComponent } from './machine-setup.component';

describe('MachineSetupComponent', () => {
  let component: MachineSetupComponent;
  let fixture: ComponentFixture<MachineSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
