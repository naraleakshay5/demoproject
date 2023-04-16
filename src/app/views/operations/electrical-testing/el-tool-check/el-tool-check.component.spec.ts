import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElToolCheckComponent } from './el-tool-check.component';

describe('ElToolCheckComponent', () => {
  let component: ElToolCheckComponent;
  let fixture: ComponentFixture<ElToolCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElToolCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElToolCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
