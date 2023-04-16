import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapConfirmationComponent } from './sap-confirmation.component';

describe('SapConfirmationComponent', () => {
  let component: SapConfirmationComponent;
  let fixture: ComponentFixture<SapConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
