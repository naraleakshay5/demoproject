import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMachineSetupComponent } from './ma-machine-setup.component';

describe('MaMachineSetupComponent', () => {
  let component: MaMachineSetupComponent;
  let fixture: ComponentFixture<MaMachineSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaMachineSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaMachineSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
