import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillSelectionComponent } from './grill-selection.component';

describe('GrillSelectionComponent', () => {
  let component: GrillSelectionComponent;
  let fixture: ComponentFixture<GrillSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
