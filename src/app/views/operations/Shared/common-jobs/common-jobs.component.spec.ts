import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonJobsComponent } from './common-jobs.component';

describe('CommonJobsComponent', () => {
  let component: CommonJobsComponent;
  let fixture: ComponentFixture<CommonJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
