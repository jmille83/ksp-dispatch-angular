import { TestBed, inject } from '@angular/core/testing';

import { OpeningsService } from './openings.service';

describe('OpeningsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpeningsService]
    });
  });

  it('should be created', inject([OpeningsService], (service: OpeningsService) => {
    expect(service).toBeTruthy();
  }));
});
