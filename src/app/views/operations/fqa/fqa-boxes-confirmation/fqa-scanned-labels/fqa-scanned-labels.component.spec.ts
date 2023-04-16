import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaScannedLabelsComponent } from './fqa-scanned-labels.component';

describe('FqaScannedLabelsComponent', () => {
  let component: FqaScannedLabelsComponent;
  let fixture: ComponentFixture<FqaScannedLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaScannedLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaScannedLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
