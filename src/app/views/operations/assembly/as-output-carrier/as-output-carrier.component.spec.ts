import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsOutputCarrierComponent } from './as-output-carrier.component';

describe('AsOutputCarrierComponent', () => {
  let component: AsOutputCarrierComponent;
  let fixture: ComponentFixture<AsOutputCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsOutputCarrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsOutputCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
