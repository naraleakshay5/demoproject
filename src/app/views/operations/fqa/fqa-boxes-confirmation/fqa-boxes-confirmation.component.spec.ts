import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaBoxesConfirmationComponent } from './fqa-boxes-confirmation.component';

describe('FqaBoxesConfirmationComponent', () => {
  let component: FqaBoxesConfirmationComponent;
  let fixture: ComponentFixture<FqaBoxesConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaBoxesConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaBoxesConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
