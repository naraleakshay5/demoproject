import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacuumProcessComponent } from './vacuum-process.component';

describe('VacuumProcessComponent', () => {
  let component: VacuumProcessComponent;
  let fixture: ComponentFixture<VacuumProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacuumProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacuumProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
