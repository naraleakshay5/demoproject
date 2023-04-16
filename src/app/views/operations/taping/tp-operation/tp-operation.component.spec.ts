import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpOperationComponent } from './tp-operation.component';

describe('TpOperationComponent', () => {
  let component: TpOperationComponent;
  let fixture: ComponentFixture<TpOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
