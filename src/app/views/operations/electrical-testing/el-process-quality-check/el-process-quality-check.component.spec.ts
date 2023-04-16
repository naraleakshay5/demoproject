import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElProcessQualityCheckComponent } from './el-process-quality-check.component';

describe('ElProcessQualityCheckComponent', () => {
  let component: ElProcessQualityCheckComponent;
  let fixture: ComponentFixture<ElProcessQualityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElProcessQualityCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElProcessQualityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
