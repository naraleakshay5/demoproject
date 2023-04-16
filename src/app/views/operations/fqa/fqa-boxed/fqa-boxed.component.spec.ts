import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaBoxedComponent } from './fqa-boxed.component';

describe('FqaBoxedComponent', () => {
  let component: FqaBoxedComponent;
  let fixture: ComponentFixture<FqaBoxedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaBoxedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaBoxedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
