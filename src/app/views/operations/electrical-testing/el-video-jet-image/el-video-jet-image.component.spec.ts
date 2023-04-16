import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElVideoJetImageComponent } from './el-video-jet-image.component';

describe('ElVideoJetImageComponent', () => {
  let component: ElVideoJetImageComponent;
  let fixture: ComponentFixture<ElVideoJetImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElVideoJetImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElVideoJetImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
