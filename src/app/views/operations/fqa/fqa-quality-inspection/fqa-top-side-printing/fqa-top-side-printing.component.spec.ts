import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaTopSidePrintingComponent } from './fqa-top-side-printing.component';

describe('FqaTopSidePrintingComponent', () => {
  let component: FqaTopSidePrintingComponent;
  let fixture: ComponentFixture<FqaTopSidePrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaTopSidePrintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaTopSidePrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
