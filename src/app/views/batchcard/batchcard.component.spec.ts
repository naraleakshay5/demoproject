import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchcardComponent } from './batchcard.component';

describe('BatchcardComponent', () => {
  let component: BatchcardComponent;
  let fixture: ComponentFixture<BatchcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
