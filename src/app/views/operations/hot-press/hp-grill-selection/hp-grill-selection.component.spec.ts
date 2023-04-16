import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpGrillSelectionComponent } from './hp-grill-selection.component';

describe('HpGrillSelectionComponent', () => {
  let component: HpGrillSelectionComponent;
  let fixture: ComponentFixture<HpGrillSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpGrillSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpGrillSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
