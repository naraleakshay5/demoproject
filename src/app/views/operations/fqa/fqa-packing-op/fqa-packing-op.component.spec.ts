import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaPackingOpComponent } from './fqa-packing-op.component';

describe('FqaPackingOpComponent', () => {
  let component: FqaPackingOpComponent;
  let fixture: ComponentFixture<FqaPackingOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaPackingOpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaPackingOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
