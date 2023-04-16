import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiComponent } from './aoi.component';

describe('AoiComponent', () => {
  let component: AoiComponent;
  let fixture: ComponentFixture<AoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AoiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
