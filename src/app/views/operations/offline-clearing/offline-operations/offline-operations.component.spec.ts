import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineOperationsComponent } from './offline-operations.component';

describe('OfflineOperationsComponent', () => {
  let component: OfflineOperationsComponent;
  let fixture: ComponentFixture<OfflineOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
