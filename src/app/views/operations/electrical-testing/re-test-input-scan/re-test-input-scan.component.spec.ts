import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTestInputScanComponent } from './re-test-input-scan.component';

describe('ReTestInputScanComponent', () => {
  let component: ReTestInputScanComponent;
  let fixture: ComponentFixture<ReTestInputScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReTestInputScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTestInputScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
