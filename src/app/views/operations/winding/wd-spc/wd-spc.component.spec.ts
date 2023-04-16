import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdSpcComponent } from './wd-spc.component';

describe('WdSpcComponent', () => {
  let component: WdSpcComponent;
  let fixture: ComponentFixture<WdSpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdSpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WdSpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
