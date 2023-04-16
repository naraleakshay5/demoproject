import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdStartOperationsComponent } from './dd-start-operations.component';

describe('DdStartOperationsComponent', () => {
  let component: DdStartOperationsComponent;
  let fixture: ComponentFixture<DdStartOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdStartOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdStartOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
