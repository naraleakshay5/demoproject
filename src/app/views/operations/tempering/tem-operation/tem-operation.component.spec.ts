import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemOperationComponent } from './tem-operation.component';

describe('TemOperationComponent', () => {
  let component: TemOperationComponent;
  let fixture: ComponentFixture<TemOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
