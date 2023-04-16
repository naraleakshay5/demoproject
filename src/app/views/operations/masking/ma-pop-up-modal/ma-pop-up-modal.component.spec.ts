import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaPopUpModalComponent } from './ma-pop-up-modal.component';

describe('MaPopUpModalComponent', () => {
  let component: MaPopUpModalComponent;
  let fixture: ComponentFixture<MaPopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaPopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
