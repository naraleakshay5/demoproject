import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElReTestingComponent } from './el-re-testing.component';

describe('ElReTestingComponent', () => {
  let component: ElReTestingComponent;
  let fixture: ComponentFixture<ElReTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElReTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElReTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
