import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreScanComponent } from './pre-scan.component';

describe('PreScanComponent', () => {
  let component: PreScanComponent;
  let fixture: ComponentFixture<PreScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
