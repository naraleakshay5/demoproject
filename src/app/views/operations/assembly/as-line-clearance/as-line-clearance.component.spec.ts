import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLineClearanceComponent } from './as-line-clearance.component';

describe('AsLineClearanceComponent', () => {
  let component: AsLineClearanceComponent;
  let fixture: ComponentFixture<AsLineClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsLineClearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsLineClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
