import { TestBed } from '@angular/core/testing';

import { ItemUsedService } from './item-used.service';

describe('ItemUsedService', () => {
  let service: ItemUsedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemUsedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
