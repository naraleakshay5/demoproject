import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResStrokeComponent } from './res-stroke.component';

describe('ResStrokeComponent', () => {
  let component: ResStrokeComponent;
  let fixture: ComponentFixture<ResStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
