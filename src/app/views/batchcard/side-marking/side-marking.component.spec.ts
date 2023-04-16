import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMarkingComponent } from './side-marking.component';

describe('SideMarkingComponent', () => {
  let component: SideMarkingComponent;
  let fixture: ComponentFixture<SideMarkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMarkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
