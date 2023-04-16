import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaHvTestComponent } from './fqa-hv-test.component';

describe('FqaHvTestComponent', () => {
  let component: FqaHvTestComponent;
  let fixture: ComponentFixture<FqaHvTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaHvTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaHvTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
