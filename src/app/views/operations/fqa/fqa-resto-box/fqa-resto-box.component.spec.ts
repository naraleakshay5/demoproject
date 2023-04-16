import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaRestoBoxComponent } from './fqa-resto-box.component';

describe('FqaRestoBoxComponent', () => {
  let component: FqaRestoBoxComponent;
  let fixture: ComponentFixture<FqaRestoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqaRestoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaRestoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
