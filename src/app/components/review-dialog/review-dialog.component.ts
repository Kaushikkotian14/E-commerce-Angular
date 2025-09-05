import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { productModel } from '../../core/models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Reviews } from '../../core/services/reviews';

@Component({
  selector: 'app-review-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialog {
public reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReviewDialog>,
    private reviewService :Reviews,
    @Inject(MAT_DIALOG_DATA) public data: productModel
  ) {
    this.reviewForm = this.fb.group({
      reviewText:[ '', Validators.required],
    });
  }

   
  public save() {
   console.log(this.data)
    if (this.reviewForm.valid) {
    const reviewText= String(this.reviewForm.value['reviewText'])
    console.log(this.data.productId,reviewText)
    this.dialogRef.close(this.reviewService.addReviews(this.data.productId,reviewText));
  alert("Thank you for your Feedback")    
    }

  }

  public close() {
    this.dialogRef.close();
  }
  
}

