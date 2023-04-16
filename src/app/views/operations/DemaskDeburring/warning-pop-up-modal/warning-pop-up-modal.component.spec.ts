import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningPopUpModalComponent } from './warning-pop-up-modal.component';

describe('WarningPopUpModalComponent', () => {
  let component: WarningPopUpModalComponent;
  let fixture: ComponentFixture<WarningPopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningPopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
