import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaCapacitorDimensionsComponent } from './fqa-capacitor-dimensions.component';

describe('FqaCapacitorDimensionsComponent', () => {
  let component: FqaCapacitorDimensionsComponent;
  let fixture: ComponentFixture<FqaCapacitorDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaCapacitorDimensionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaCapacitorDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
