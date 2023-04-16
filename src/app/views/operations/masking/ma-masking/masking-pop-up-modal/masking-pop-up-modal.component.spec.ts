import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskingPopUpModalComponent } from './masking-pop-up-modal.component';

describe('MaskingPopUpModalComponent', () => {
  let component: MaskingPopUpModalComponent;
  let fixture: ComponentFixture<MaskingPopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaskingPopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskingPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
