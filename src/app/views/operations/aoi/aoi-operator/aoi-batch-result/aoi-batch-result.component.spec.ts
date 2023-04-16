import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiBatchResultComponent } from './aoi-batch-result.component';

describe('AoiBatchResultComponent', () => {
  let component: AoiBatchResultComponent;
  let fixture: ComponentFixture<AoiBatchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoiBatchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiBatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
