import { TestBed } from '@angular/core/testing';

import { ElTestingService } from './el-testing.service';

describe('ElTestingService', () => {
  let service: ElTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
