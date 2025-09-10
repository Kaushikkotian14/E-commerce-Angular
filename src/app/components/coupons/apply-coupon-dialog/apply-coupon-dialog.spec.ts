import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCouponDialog } from './apply-coupon-dialog';

describe('ApplyCouponDialog', () => {
  let component: ApplyCouponDialog;
  let fixture: ComponentFixture<ApplyCouponDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyCouponDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyCouponDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
