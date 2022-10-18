import { TestBed } from '@angular/core/testing';

import { DefinitiveOrderService } from './definitive-order.service';

describe('DefinitiveOrderService', () => {
  let service: DefinitiveOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitiveOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
