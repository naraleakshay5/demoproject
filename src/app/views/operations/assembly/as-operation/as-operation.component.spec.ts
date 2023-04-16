import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsOperationComponent } from './as-operation.component';

describe('AsOperationComponent', () => {
  let component: AsOperationComponent;
  let fixture: ComponentFixture<AsOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
