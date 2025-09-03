import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../core/services/product';
import { AuthService } from '../../core/services/auth-service';
import { userModel } from '../../core/models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { productModel } from '../../core/models/product.model';
import { ReactiveFormsModule,FormControl } from '@angular/forms';
import { ReviewDialog } from '../review-dialog/review-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { reviewModel } from '../../core/models/product-reviews.model';
import { Reviews } from '../../core/services/reviews';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-review',
  imports: [MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatDialogModule,MatCardModule,DatePipe],
  templateUrl: './review.html',
  styleUrl: './review.scss'
})
export class Review implements OnInit{
public product:productModel | undefined;
public products!:productModel[];
public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
public reviews!:reviewModel[];
public productReviews!:reviewModel[];
 @Input() id!: number ;

constructor( private productService:Product, private authService:AuthService, private reviewService:Reviews,private dialog: MatDialog){}

ngOnInit(): void {
this.getReviews();
this.getProducts();
}

public getReviews(){
  this.authService.login(this.currentUser)
 this.reviews= this.reviewService.getReviews();
 this.productReviews=this.reviews.filter(review=>review.productId === this.id)
 console.log( this.productReviews)
}

public getProducts(){
  this.authService.login(this.currentUser)
 this.products= this.productService.getProducts();
 this.product=this.products.find(product => product.productId === this.id)
 console.log('this',this.product)
}

public addReview() {

    const dialogRef = this.dialog.open(ReviewDialog, {
      width: '400px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(result => {
   this.getReviews()
  });
  
  }

  public removeReview(id:number){
    this.reviewService.deleteReview(id)
    this.getReviews()
  }
}
