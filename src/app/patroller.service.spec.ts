import { TestBed, inject } from '@angular/core/testing';

import { PatrollerService } from './patroller.service';

describe('PatrollerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatrollerService]
    });
  });

  it('should be created', inject([PatrollerService], (service: PatrollerService) => {
    expect(service).toBeTruthy();
  }));
});
