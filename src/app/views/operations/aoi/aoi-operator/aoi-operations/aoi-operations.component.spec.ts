import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiOPerationsComponent } from './aoi-operations.component';

describe('AoiOPerationsComponent', () => {
  let component: AoiOPerationsComponent;
  let fixture: ComponentFixture<AoiOPerationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiOPerationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiOPerationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
