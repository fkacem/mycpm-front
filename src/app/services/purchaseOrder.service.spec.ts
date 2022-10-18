/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PurchaseOrderService } from './purchaseOrder.service';

describe('Service: PurchaseOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseOrderService]
    });
  });

  it('should ...', inject([PurchaseOrderService], (service: PurchaseOrderService) => {
    expect(service).toBeTruthy();
  }));
});
