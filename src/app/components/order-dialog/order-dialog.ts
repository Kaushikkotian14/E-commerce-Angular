import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup,FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { productModel } from '../../core/models/product.model';
import { orderModel } from '../../core/models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../core/services/order';
import { Product } from '../../core/services/product';
import { Cart } from '../../core/services/cart';
import { cartModel } from '../../core/models/cart.model';
import { userModel } from '../../core/models/user.model';

export interface OrderDialogData {
  userCart: cartModel[];
  totalAmount: number;
}

@Component({
  selector: 'app-order-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './order-dialog.html',
  styleUrl: './order-dialog.scss'
})
export class OrderDialog {
public orderForm: FormGroup;
public cart!:cartModel[];
public userCart!:cartModel[];
public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderDialog>,
    private orderService :Order,
    private productService:Product,
    private cartService :Cart,
    @Inject(MAT_DIALOG_DATA) public data: OrderDialogData
  ) {
    this.orderForm = this.fb.group({
      address:[ '', Validators.required],
      // quantity: [ null, Validators.required],
    });
  }

  public save() {
    if (this.orderForm.valid) {
     this.userCart= this.data.userCart
    const address= String(this.orderForm.value['address'])
    this.dialogRef.close(

        this.orderService.addOrderByCart(this.userCart,this.data.totalAmount,address)       
      );
      for(const cart of this.data.userCart){
      this.productService.updateQuantity(cart.product,cart.quantity)}
  alert("Ordered placed successfully")

      
    }

  }

  public close() {
    this.dialogRef.close();
  }
  
}
