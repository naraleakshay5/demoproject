import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaToolCheckComponent } from './ma-tool-check.component';

describe('MaToolCheckComponent', () => {
  let component: MaToolCheckComponent;
  let fixture: ComponentFixture<MaToolCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaToolCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaToolCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
