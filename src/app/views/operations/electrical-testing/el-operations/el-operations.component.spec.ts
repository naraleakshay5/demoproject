import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElOperationsComponent } from './el-operations.component';

describe('ElOperationsComponent', () => {
  let component: ElOperationsComponent;
  let fixture: ComponentFixture<ElOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
