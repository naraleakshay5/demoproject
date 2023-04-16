import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsWheelOperationComponent } from './ms-wheel-operation.component';

describe('MsWheelOperationComponent', () => {
  let component: MsWheelOperationComponent;
  let fixture: ComponentFixture<MsWheelOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsWheelOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsWheelOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
