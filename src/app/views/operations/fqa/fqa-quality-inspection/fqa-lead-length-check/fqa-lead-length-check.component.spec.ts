import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaLeadLengthCheckComponent } from './fqa-lead-length-check.component';

describe('FqaLeadLengthCheckComponent', () => {
  let component: FqaLeadLengthCheckComponent;
  let fixture: ComponentFixture<FqaLeadLengthCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaLeadLengthCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaLeadLengthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
