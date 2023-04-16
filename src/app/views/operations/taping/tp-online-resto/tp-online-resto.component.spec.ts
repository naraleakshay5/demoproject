import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpOnlineRestoComponent } from './tp-online-resto.component';

describe('TpOnlineRestoComponent', () => {
  let component: TpOnlineRestoComponent;
  let fixture: ComponentFixture<TpOnlineRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpOnlineRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpOnlineRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
