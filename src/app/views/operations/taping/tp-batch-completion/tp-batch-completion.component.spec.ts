import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpBatchCompletionComponent } from './tp-batch-completion.component';

describe('TpBatchCompletionComponent', () => {
  let component: TpBatchCompletionComponent;
  let fixture: ComponentFixture<TpBatchCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpBatchCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpBatchCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
