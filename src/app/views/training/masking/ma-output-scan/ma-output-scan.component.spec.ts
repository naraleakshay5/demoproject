import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaOutputScanComponent } from './ma-output-scan.component';

describe('MaOutputScanComponent', () => {
  let component: MaOutputScanComponent;
  let fixture: ComponentFixture<MaOutputScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaOutputScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaOutputScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
