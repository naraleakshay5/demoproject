import { TestBed } from '@angular/core/testing';

import { AoiSupervisorService } from './aoi-supervisor.service';

describe('AoiSupervisorService', () => {
  let service: AoiSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AoiSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
