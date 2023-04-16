import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiSupervisorCheckoutFlowComponent } from './aoi-supervisor-checkout-flow.component';

describe('AoiSupervisorCheckoutFlowComponent', () => {
  let component: AoiSupervisorCheckoutFlowComponent;
  let fixture: ComponentFixture<AoiSupervisorCheckoutFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiSupervisorCheckoutFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiSupervisorCheckoutFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
