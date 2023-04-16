import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpProcessQualityCheckComponent } from './hp-process-quality-check.component';

describe('HpProcessQualityCheckComponent', () => {
  let component: HpProcessQualityCheckComponent;
  let fixture: ComponentFixture<HpProcessQualityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpProcessQualityCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpProcessQualityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
