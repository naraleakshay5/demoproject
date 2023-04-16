import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdToolCheckComponent } from './wd-tool-check.component';

describe('WdToolCheckComponent', () => {
  let component: WdToolCheckComponent;
  let fixture: ComponentFixture<WdToolCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdToolCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdToolCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
