import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaPackingStatusComponent } from './fqa-packing-status.component';

describe('FqaPackingStatusComponent', () => {
  let component: FqaPackingStatusComponent;
  let fixture: ComponentFixture<FqaPackingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaPackingStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaPackingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
