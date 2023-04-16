import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMaskingComponent } from './ma-masking.component';

describe('MaMaskingComponent', () => {
  let component: MaMaskingComponent;
  let fixture: ComponentFixture<MaMaskingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaMaskingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaMaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
