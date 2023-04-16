import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsInputCarrierComponent } from './as-input-carrier.component';

describe('AsInputCarrierComponent', () => {
  let component: AsInputCarrierComponent;
  let fixture: ComponentFixture<AsInputCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsInputCarrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsInputCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
