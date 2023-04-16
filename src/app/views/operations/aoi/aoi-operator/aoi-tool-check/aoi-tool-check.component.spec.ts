import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiToolCheckComponent } from './aoi-tool-check.component';

describe('AoiToolCheckComponent', () => {
  let component: AoiToolCheckComponent;
  let fixture: ComponentFixture<AoiToolCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiToolCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiToolCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
