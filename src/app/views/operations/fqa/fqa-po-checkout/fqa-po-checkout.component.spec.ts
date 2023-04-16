import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaPoCheckoutComponent } from './fqa-po-checkout.component';

describe('FqaPoCheckoutComponent', () => {
  let component: FqaPoCheckoutComponent;
  let fixture: ComponentFixture<FqaPoCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaPoCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaPoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
