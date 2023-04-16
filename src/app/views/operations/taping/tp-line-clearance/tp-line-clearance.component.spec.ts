import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpLineClearanceComponent } from './tp-line-clearance.component';

describe('TpLineClearanceComponent', () => {
  let component: TpLineClearanceComponent;
  let fixture: ComponentFixture<TpLineClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpLineClearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLineClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
