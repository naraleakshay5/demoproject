import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsIpcarrierValidationComponent } from './ms-ipcarrier-validation.component';

describe('MsIpcarrierValidationComponent', () => {
  let component: MsIpcarrierValidationComponent;
  let fixture: ComponentFixture<MsIpcarrierValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsIpcarrierValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsIpcarrierValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
