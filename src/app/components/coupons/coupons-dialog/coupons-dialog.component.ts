import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CouponsService } from '../../../core/services/coupons.service';
import { Product } from '../../../core/services/product.service';
import { couponModel } from '../../../core/models/coupon.model';
import { productModel } from '../../../core/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const negativeNumber=/-\d+(\.\d+)?/

@Component({
  selector: 'app-coupons-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './coupons-dialog.component.html',
  styleUrl: './coupons-dialog.component.scss'
})
export class CouponsDialog {
  public couponForm: FormGroup;
  public cupon!:couponModel;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CouponsDialog>,
   private couponsService:CouponsService, 
   private productService:Product,
    private snackBar:MatSnackBar,
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

  public save() {
    if (this.couponForm.valid) {
      this.dialogRef.close(
        this.couponsService.createCoupon(this.couponForm.value)
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
