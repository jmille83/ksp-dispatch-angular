import { TestBed } from '@angular/core/testing';

import { ClosingsService } from './closings.service';

describe('ClosingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClosingsService = TestBed.get(ClosingsService);
    expect(service).toBeTruthy();
  });
});
