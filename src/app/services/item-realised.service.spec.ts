import { TestBed } from '@angular/core/testing';

import { ItemRealisedService } from './item-realised.service';

describe('ItemRealisedService', () => {
  let service: ItemRealisedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRealisedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
