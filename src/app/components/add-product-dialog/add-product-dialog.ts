import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { productModel } from '../../core/models/product.model';
import { CategoryModel } from '../../core/models/category.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-product-dialog',
  imports: [ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,MatIconModule],
  templateUrl: './add-product-dialog.html',
  styleUrls: ['./add-product-dialog.scss'],
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
      img: this.fb.array(
        data?.img?.length
          ? data.img.map((url) => this.fb.control(url, Validators.required))
          : [this.fb.control('', Validators.required)]
      ),
      description: [data?.description || '', Validators.required],
      category: [data?.category || '', Validators.required],
      cost: [data?.cost || null, Validators.required],
      quantity: [data?.quantity || null, Validators.required],
    });
  }

  get imgArray(): FormArray {
    return this.productForm.get('img') as FormArray;
  }

  public addImageField() {
    this.imgArray.push(this.fb.control('', Validators.required));
  }

  public removeImageField(index: number) {
    this.imgArray.removeAt(index);
  }

  public save() {
    if (this.productForm.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.productForm.value,
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

  categories: CategoryModel[] = [
    { name: 'Electronic Appliances', value: 'Electronic Appliances' },
    { name: 'Grocery', value: 'Grocery' },
    { name: 'Cosmetics', value: 'Cosmetics' },
    { name: 'Fashion', value: 'Fashion' },
    { name: 'Food', value: 'Food' },
    { name: 'Toys', value: 'Toys' },
    { name: 'Sports', value: 'Sports' },
  ];
}
