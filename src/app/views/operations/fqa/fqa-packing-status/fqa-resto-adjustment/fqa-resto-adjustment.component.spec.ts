import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaRestoAdjustmentComponent } from './fqa-resto-adjustment.component';

describe('FqaRestoAdjustmentComponent', () => {
  let component: FqaRestoAdjustmentComponent;
  let fixture: ComponentFixture<FqaRestoAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaRestoAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaRestoAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
