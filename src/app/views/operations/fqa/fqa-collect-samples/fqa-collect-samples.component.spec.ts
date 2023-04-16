import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaCollectSamplesComponent } from './fqa-collect-samples.component';

describe('FqaCollectSamplesComponent', () => {
  let component: FqaCollectSamplesComponent;
  let fixture: ComponentFixture<FqaCollectSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaCollectSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaCollectSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
