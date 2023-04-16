import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpPackingMaterialComponent } from './tp-packing-material.component';

describe('TpPackingMaterialComponent', () => {
  let component: TpPackingMaterialComponent;
  let fixture: ComponentFixture<TpPackingMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpPackingMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpPackingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
