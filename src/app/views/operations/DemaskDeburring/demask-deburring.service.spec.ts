import { TestBed } from '@angular/core/testing';

import { DemaskDeburringService } from './demask-deburring.service';

describe('DemaskDeburringService', () => {
  let service: DemaskDeburringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemaskDeburringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
