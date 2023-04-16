import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLeadLengthCheckComponent } from './as-lead-length-check.component';

describe('AsLeadLengthCheckComponent', () => {
  let component: AsLeadLengthCheckComponent;
  let fixture: ComponentFixture<AsLeadLengthCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsLeadLengthCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsLeadLengthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
