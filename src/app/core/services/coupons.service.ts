import { Injectable } from '@angular/core';
import { couponModel } from '../models/coupon.model';
import { CouponMappingService } from './coupon-mapping.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

    constructor(private couponMappingService:CouponMappingService,private snackBar:MatSnackBar){}

  public getCoupons():couponModel[]{
    return JSON.parse(localStorage.getItem('coupon') || '[]')
  }

  public createCoupon(coupon:couponModel) {
     const coupons = this.getCoupons();
    coupons.push(coupon);
    localStorage.setItem('coupon', JSON.stringify(coupons));
  }

   public deleteCoupon(id:number){
    const coupons = this.getCoupons();
  if(confirm("Are you sure you want to remove item from cart")){
    const index = coupons.findIndex(data=> data.couponId == id);
    coupons.splice(index,1);
    this.couponMappingService.deleteCoupon(id)
    localStorage.setItem('coupon',JSON.stringify(coupons))
    this.snackBar.open('Coupon Deleted', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
  }
  }

}
