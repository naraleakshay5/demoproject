import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReworkOperationComponent } from './dd-rework-operation.component';

describe('DdReworkOperationComponent', () => {
  let component: DdReworkOperationComponent;
  let fixture: ComponentFixture<DdReworkOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdReworkOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReworkOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
