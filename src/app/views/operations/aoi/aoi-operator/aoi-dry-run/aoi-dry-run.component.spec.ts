import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiDryRunComponent } from './aoi-dry-run.component';

describe('AoiDryRunComponent', () => {
  let component: AoiDryRunComponent;
  let fixture: ComponentFixture<AoiDryRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiDryRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiDryRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
