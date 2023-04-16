import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsProcessQualityCheckComponent } from './ms-process-quality-check.component';

describe('MsProcessQualityCheckComponent', () => {
  let component: MsProcessQualityCheckComponent;
  let fixture: ComponentFixture<MsProcessQualityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsProcessQualityCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsProcessQualityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
