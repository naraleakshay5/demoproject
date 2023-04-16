import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCuttingComponent } from './lead-cutting.component';

describe('LeadCuttingComponent', () => {
  let component: LeadCuttingComponent;
  let fixture: ComponentFixture<LeadCuttingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCuttingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
