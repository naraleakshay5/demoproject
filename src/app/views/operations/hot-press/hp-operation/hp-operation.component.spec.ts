import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpOperationComponent } from './hp-operation.component';

describe('HpOperationComponent', () => {
  let component: HpOperationComponent;
  let fixture: ComponentFixture<HpOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
