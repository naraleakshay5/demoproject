import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiDataComponent } from './aoi-data.component';

describe('AoiDataComponent', () => {
  let component: AoiDataComponent;
  let fixture: ComponentFixture<AoiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
