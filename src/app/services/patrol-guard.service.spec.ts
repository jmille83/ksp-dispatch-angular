import { TestBed } from '@angular/core/testing';

import { PatrolGuard } from './patrol-guard.service';

describe('PatrolGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatrolGuard = TestBed.get(PatrolGuard);
    expect(service).toBeTruthy();
  });
});
