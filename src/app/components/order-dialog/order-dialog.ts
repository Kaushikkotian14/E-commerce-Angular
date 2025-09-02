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

@Component({
  selector: 'app-order-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './order-dialog.html',
  styleUrl: './order-dialog.scss'
})
export class OrderDialog {
public orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderDialog>,
    private orderService :Order,
    private productService:Product,
    @Inject(MAT_DIALOG_DATA) public data: productModel
  ) {
    this.orderForm = this.fb.group({
      address:[ '', Validators.required],
      quantity: [ null, Validators.required],
    });
  }

   
  public save() {
    if (this.orderForm.valid) {
     if(this.data.quantity>0 && this.orderForm.value['quantity'] !== 0 && (this.data.quantity>this.orderForm.value['quantity'] )){
    const quantity=Number(this.orderForm.value['quantity'])
    const address= String(this.orderForm.value['address'])
    this.dialogRef.close(
        this.orderService.addOrder(this.data,quantity,address)        
      );
      this.productService.updateQuantity(this.data,quantity)
  alert("Added successfully")
}
else if(this.data.quantity>0 && (this.data.quantity>this.orderForm.value['quantity'])){
  alert("Add quantity")
}
else{
  alert("Out of Stock")
}  
      
    }

  }

  public close() {
    this.dialogRef.close();
  }
  
}
