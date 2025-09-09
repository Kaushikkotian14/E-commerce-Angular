import { Injectable } from '@angular/core';
import { couponModel } from '../models/coupon.model';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')

  public getCoupons():couponModel[]{
    return JSON.parse(localStorage.getItem('coupon') || '[]')
  }

  public createCoupon(coupon:couponModel) {
     const coupons = this.getCoupons();
    coupons.push(coupon);
    console.log(coupons);
    localStorage.setItem('coupon', JSON.stringify(coupons));
  }

   public deleteCoupon(id:number){
    const coupons = this.getCoupons();
  if(confirm("Are you sure you want to remove item from cart")){
    const index = coupons.findIndex(data=> data.couponId == id);
    coupons.splice(index,1);
    localStorage.setItem('coupon',JSON.stringify(coupons))
    console.log("deleted",coupons)
  }
  }

}
