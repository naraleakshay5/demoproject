import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiSupervisorCheckoutComponent } from './aoi-supervisor-checkout.component';

describe('AoiSupervisorCheckoutComponent', () => {
  let component: AoiSupervisorCheckoutComponent;
  let fixture: ComponentFixture<AoiSupervisorCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiSupervisorCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiSupervisorCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
