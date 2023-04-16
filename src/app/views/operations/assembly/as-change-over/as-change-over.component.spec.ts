import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsChangeOverComponent } from './as-change-over.component';

describe('AsChangeOverComponent', () => {
  let component: AsChangeOverComponent;
  let fixture: ComponentFixture<AsChangeOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsChangeOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsChangeOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
