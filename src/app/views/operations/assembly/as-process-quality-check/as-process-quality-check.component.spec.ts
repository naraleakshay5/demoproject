import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsProcessQualityCheckComponent } from './as-process-quality-check.component';

describe('AsProcessQualityCheckComponent', () => {
  let component: AsProcessQualityCheckComponent;
  let fixture: ComponentFixture<AsProcessQualityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsProcessQualityCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsProcessQualityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
