import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpProcessQualityComponent } from './tp-process-quality.component';

describe('TpProcessQualityComponent', () => {
  let component: TpProcessQualityComponent;
  let fixture: ComponentFixture<TpProcessQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpProcessQualityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpProcessQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
