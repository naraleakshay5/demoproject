import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdWindingComponent } from './wd-winding.component';

describe('WdWindingComponent', () => {
  let component: WdWindingComponent;
  let fixture: ComponentFixture<WdWindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdWindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdWindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
