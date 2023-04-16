import { TestBed } from '@angular/core/testing';

import { MetalSprayService } from './metal-spray.service';

describe('MetalSprayService', () => {
  let service: MetalSprayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetalSprayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
