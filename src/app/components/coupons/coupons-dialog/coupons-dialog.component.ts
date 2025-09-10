import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CouponsService } from '../../../core/services/coupons.service';
import { Product } from '../../../core/services/product.service';
import { couponModel } from '../../../core/models/coupon.model';
import { productModel } from '../../../core/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CouponMappingService } from '../../../core/services/coupon-mapping.service';
import { couponMappingModel } from '../../../core/models/coupon-mapping.model';

const negativeNumber=/-\d+(\.\d+)?/

@Component({
  selector: 'app-coupons-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './coupons-dialog.component.html',
  styleUrl: './coupons-dialog.component.scss'
})
export class CouponsDialog implements OnInit{
  public couponForm: FormGroup;
  public cupon!:couponModel;
  public products!:productModel[];
  public selectedProduct = new FormControl<number[]>([]);
  public isChecked:boolean=false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CouponsDialog>,
   private couponsService:CouponsService, 
   private productService:Product,
    private snackBar:MatSnackBar,
    private couponMappingService:CouponMappingService,
    @Inject(MAT_DIALOG_DATA) public data: CouponsDialog
  ) { 
    this.couponForm = this.fb.group({
    couponId: Math.floor(Math.random() * 100000),
    couponCode: ['', Validators.required],
    discount: [null, Validators.required],
    maxAmount: [null, Validators.required],
    minQuantityCost: [null, [Validators.required]],
    status: ['valid', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProducts()
  }

  public getProducts(){
    this.products=this.productService.getProducts()
  }

  public createCoupon(){
   this.couponsService.createCoupon(this.couponForm.value) 
    for(let i=0; i<this.selectedProduct.value!.length; i++ ){
   const couponMapping:couponMappingModel={
    mappingId:Math.floor(Math.random() * 100000),
    couponId:this.couponForm.controls['couponId'].value,
    productId:this.selectedProduct.value![i],
   }
   this.couponMappingService.createCouponMappings(couponMapping)
   } 
  }

  public save() {
    if (this.couponForm.valid) {
      this.dialogRef.close(
          this.createCoupon()   
      );
       this.snackBar.open('Cupon created successfully', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

}
