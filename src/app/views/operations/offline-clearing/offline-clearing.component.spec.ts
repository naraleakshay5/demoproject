import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineClearingComponent } from './offline-clearing.component';

describe('OfflineClearingComponent', () => {
  let component: OfflineClearingComponent;
  let fixture: ComponentFixture<OfflineClearingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfflineClearingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineClearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
