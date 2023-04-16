import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMAterialToolMachineSetupComponent } from './ma-material-tool-machine-setup.component';

describe('MaMAterialToolMachineSetupComponent', () => {
  let component: MaMAterialToolMachineSetupComponent;
  let fixture: ComponentFixture<MaMAterialToolMachineSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaMAterialToolMachineSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaMAterialToolMachineSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
