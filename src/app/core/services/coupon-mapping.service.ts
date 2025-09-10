import { Injectable } from '@angular/core';
import { couponMappingModel } from '../models/coupon-mapping.model';

@Injectable({
  providedIn: 'root'
})
export class CouponMappingService {


  
   public getCouponMappings():couponMappingModel[]{
      return JSON.parse(localStorage.getItem('couponMapping') || '[]')
    }
  
    public createCouponMappings(couponMapping:couponMappingModel) {
       const couponMappings = this.getCouponMappings();
      couponMappings.push(couponMapping);
      console.log("mapping",couponMappings);
      localStorage.setItem('couponMapping', JSON.stringify(couponMappings));
    }
  
     public deleteCoupon(id:number){
      const couponMappings = this.getCouponMappings();   
      const index = couponMappings.findIndex(data=> data.couponId == id);
      couponMappings.splice(index);
      localStorage.setItem('couponMapping',JSON.stringify(couponMappings))
    
  } 
}
