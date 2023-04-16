import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuringVisualInspComponent } from './curing-visual-insp.component';

describe('CuringVisualInspComponent', () => {
  let component: CuringVisualInspComponent;
  let fixture: ComponentFixture<CuringVisualInspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuringVisualInspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuringVisualInspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
