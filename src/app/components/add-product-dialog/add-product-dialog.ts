import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { productModel } from '../../core/models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatFileUploadModule } from 'mat-file-upload';
@Component({
  selector: 'app-add-product-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatFileUploadModule],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss'
})
export class AddProductDialog {
public productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: productModel
  ) {
    this.productForm = this.fb.group({
      productName: [data?.productName || '', Validators.required],
      img: [data?.img || '', Validators.required],
      description: [data?.description || '', Validators.required],
      category: [data?.category || '', Validators.required],
      cost: [data?.cost || null, Validators.required],
      quantity: [data?.quantity || null, Validators.required],
    });
  }

  public save() {
    // console.log(this.productForm.value);
    // console.log(this.data)
    if (this.productForm.valid) {
     
      this.dialogRef.close({
        ...this.data, ...this.productForm.value
      });
    }

  }

  public close() {
    this.dialogRef.close();
  }
}
