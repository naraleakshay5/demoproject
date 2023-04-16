import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResDrumLoadComponent } from './res-drum-load.component';

describe('ResDrumLoadComponent', () => {
  let component: ResDrumLoadComponent;
  let fixture: ComponentFixture<ResDrumLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResDrumLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResDrumLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
