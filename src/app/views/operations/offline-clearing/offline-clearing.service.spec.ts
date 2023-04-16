import { TestBed } from '@angular/core/testing';

import { OfflineClearingService } from './offline-clearing.service';

describe('OfflineClearingService', () => {
  let service: OfflineClearingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineClearingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
