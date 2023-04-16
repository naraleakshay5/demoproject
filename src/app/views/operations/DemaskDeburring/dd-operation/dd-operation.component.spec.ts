import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdOperationComponent } from './dd-operation.component';

describe('DdOperationComponent', () => {
  let component: DdOperationComponent;
  let fixture: ComponentFixture<DdOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
