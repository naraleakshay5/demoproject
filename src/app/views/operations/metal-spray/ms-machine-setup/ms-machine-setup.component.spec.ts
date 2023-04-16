import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMachineSetupComponent } from './ms-machine-setup.component';

describe('MsMachineSetupComponent', () => {
  let component: MsMachineSetupComponent;
  let fixture: ComponentFixture<MsMachineSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsMachineSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsMachineSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
