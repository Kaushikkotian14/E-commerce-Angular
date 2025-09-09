import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../core/services/order.service';
import { Product } from '../../core/services/product.service';
import { Cart } from '../../core/services/cart.service';
import { cartModel } from '../../core/models/cart.model';
import { userModel } from '../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface OrderDialogData {
  userCart: cartModel[];
  totalAmount: number;
}

@Component({
  selector: 'app-order-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialog {
  public orderForm: FormGroup;
  public cart!: cartModel[];
  public userCart!: cartModel[];
  public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderDialog>,
    private orderService: Order,
    private productService: Product,
    private cartService: Cart,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: OrderDialogData
  ) {
    this.orderForm = this.fb.group({
      address: ['', Validators.required],
      // quantity: [ null, Validators.required],
    });
  }

  public removeUserCart() {
    this.cartService.deleteUserCart(this.currentUser.userId)
  }

  public save() {
    if (this.orderForm.valid) {
      this.userCart = this.data.userCart
      const address = String(this.orderForm.value['address'])
      this.dialogRef.close(
        this.orderService.addOrderByCart(this.userCart, this.data.totalAmount, address)
      );
      for (const cart of this.data.userCart) {
        this.productService.updateQuantity(cart.product!, cart.quantity)
      }
       this.snackBar.open('Ordered placed successfully', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.removeUserCart()
    }
  }

  public close() {
    this.dialogRef.close();
  }

}
