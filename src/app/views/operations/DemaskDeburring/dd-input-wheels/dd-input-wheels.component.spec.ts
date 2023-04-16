import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdInputWheelsComponent } from './dd-input-wheels.component';

describe('DdInputWheelsComponent', () => {
  let component: DdInputWheelsComponent;
  let fixture: ComponentFixture<DdInputWheelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdInputWheelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdInputWheelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
