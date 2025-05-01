import { TestBed } from '@angular/core/testing';

import { PlanDataService } from './plan-data.service';

describe('PlanDataService', () => {
  let service: PlanDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
