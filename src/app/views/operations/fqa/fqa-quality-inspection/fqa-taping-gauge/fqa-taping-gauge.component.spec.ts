import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaTapingGaugeComponent } from './fqa-taping-gauge.component';

describe('FqaTapingGaugeComponent', () => {
  let component: FqaTapingGaugeComponent;
  let fixture: ComponentFixture<FqaTapingGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaTapingGaugeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaTapingGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
