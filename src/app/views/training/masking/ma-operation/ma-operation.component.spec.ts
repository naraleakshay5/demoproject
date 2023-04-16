import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaOperationComponent } from './ma-operation.component';

describe('MaOperationComponent', () => {
  let component: MaOperationComponent;
  let fixture: ComponentFixture<MaOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
