import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotPressingComponent } from './hot-pressing.component';

describe('HotPressingComponent', () => {
  let component: HotPressingComponent;
  let fixture: ComponentFixture<HotPressingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotPressingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotPressingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
