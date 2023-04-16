import { TestBed } from '@angular/core/testing';

import { BatchcardService } from './batchcard.service';

describe('BatchcardService', () => {
  let service: BatchcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
