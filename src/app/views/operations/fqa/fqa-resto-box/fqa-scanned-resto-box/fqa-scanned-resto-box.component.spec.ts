import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaScannedRestoBoxComponent } from './fqa-scanned-resto-box.component';

describe('FqaScannedRestoBoxComponent', () => {
  let component: FqaScannedRestoBoxComponent;
  let fixture: ComponentFixture<FqaScannedRestoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaScannedRestoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaScannedRestoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
