import { TestBed } from '@angular/core/testing';

import { CouponMappingService } from './coupon-mapping.service';

describe('CouponMappingService', () => {
  let service: CouponMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
