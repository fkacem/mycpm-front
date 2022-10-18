import { TestBed } from '@angular/core/testing';

import { BusinessSectorService } from './business-sector.service';

describe('BusinessSectorService', () => {
  let service: BusinessSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
