import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskingReworkPopUpModalComponent } from './masking-rework-pop-up-modal.component';

describe('MaskingReworkPopUpModalComponent', () => {
  let component: MaskingReworkPopUpModalComponent;
  let fixture: ComponentFixture<MaskingReworkPopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaskingReworkPopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskingReworkPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
