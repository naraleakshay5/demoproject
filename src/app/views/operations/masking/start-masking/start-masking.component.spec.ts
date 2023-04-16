import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMaskingComponent } from './start-masking.component';

describe('StartMaskingComponent', () => {
  let component: StartMaskingComponent;
  let fixture: ComponentFixture<StartMaskingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartMaskingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
