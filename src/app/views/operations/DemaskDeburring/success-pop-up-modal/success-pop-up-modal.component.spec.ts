import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPopUpModalComponent } from './success-pop-up-modal.component';

describe('SuccessPopUpModalComponent', () => {
  let component: SuccessPopUpModalComponent;
  let fixture: ComponentFixture<SuccessPopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessPopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
