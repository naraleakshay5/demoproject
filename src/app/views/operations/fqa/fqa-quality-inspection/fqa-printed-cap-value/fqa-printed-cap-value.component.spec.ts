import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaPrintedCapValueComponent } from './fqa-printed-cap-value.component';

describe('FqaPrintedCapValueComponent', () => {
  let component: FqaPrintedCapValueComponent;
  let fixture: ComponentFixture<FqaPrintedCapValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaPrintedCapValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaPrintedCapValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
