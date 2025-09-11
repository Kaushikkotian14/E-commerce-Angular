import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CouponsService } from '../../../core/services/coupons.service';
import { CouponMappingService } from '../../../core/services/coupon-mapping.service';
import { couponModel } from '../../../core/models/coupon.model';
import { couponMappingModel } from '../../../core/models/coupon-mapping.model';
import { cartModel } from '../../../core/models/cart.model';
import { Cart } from '../../../core/services/cart.service';

@Component({
  selector: 'app-apply-coupon-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './apply-coupon-dialog.component.html',
  styleUrl: './apply-coupon-dialog.component.scss'
})
export class ApplyCouponDialog implements OnInit {
  public applyCouponForm: FormGroup;
  public couponMappings: couponMappingModel[] = [];
  public coupons: couponModel[] = [];
  public coupon!: couponModel;
  public PriceAfterDiscount: number = 0
  public OfferedDiscount: number = 0
  // public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplyCouponDialog>,
    private couponsService: CouponsService,
    private couponMappingService: CouponMappingService,
    private snackBar: MatSnackBar,
    private cartService: Cart,
    @Inject(MAT_DIALOG_DATA) public data: cartModel
  ) {
    this.applyCouponForm = this.fb.group({
      couponCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCouponMappings();
    this.getCoupons()
  }

  public getCouponMappings() {
    this.couponMappings = this.couponMappingService.getCouponMappings()
  }

  public getCoupons() {
    this.coupons = this.couponsService.getCoupons()
  }

  public checkCoupons() {
    const cuponCode = String(this.applyCouponForm.controls['couponCode'].value)
    const couponData = this.coupons.find(coupon => coupon.couponCode === cuponCode)
    const foundMapping = this.couponMappings.find(coupon => coupon.couponId === couponData?.couponId && coupon.productId === this.data.productId)
    const totalCost = this.data.product?.cost! * this.data.quantity!
    console.log("map", foundMapping?.productId)
    if (foundMapping) {

      if (this.data.totalCost! > couponData?.minQuantityCost!) {
        this.OfferedDiscount = totalCost * (couponData?.discount! / 100)
        this.PriceAfterDiscount = totalCost - this.OfferedDiscount
        console.log(this.PriceAfterDiscount, this.OfferedDiscount)
        if (this.OfferedDiscount > couponData?.maxAmount!) {
          this.cartService.setofferedPrice(totalCost - couponData?.maxAmount!)
          this.cartService.setdiscountedPrice(couponData?.maxAmount!)
          this.cartService.setproductId(foundMapping.productId)
        } else {
          this.cartService.setofferedPrice(totalCost - this.OfferedDiscount)
          this.cartService.setdiscountedPrice(this.OfferedDiscount)
          this.cartService.setproductId(foundMapping.productId)
        }

        this.snackBar.open(`Coupon is applied`, 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.snackBar.open(`Coupon is  applicable on purchase of above ₹ ${couponData?.minQuantityCost!}`, 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }

    } else {
      this.snackBar.open('Coupon is Invalid', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

  }

  public save() {
    this.checkCoupons()
    this.close()
  }

  public close() {
    this.dialogRef.close();
  }

}
