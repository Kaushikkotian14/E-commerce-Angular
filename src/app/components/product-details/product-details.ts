import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { productModel } from '../../core/models/product.model';
import { Product } from '../../core/services/product';
import { AuthService } from '../../core/services/auth-service';
import { userModel } from '../../core/models/user.model';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cart } from '../../core/services/cart';
import { ReactiveFormsModule,FormControl } from '@angular/forms';
import { OrderDialog } from '../order-dialog/order-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Review } from '../review/review';
import { cartModel } from '../../core/models/cart.model';
import { MatCardModule } from '@angular/material/card';

 

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,MatButton,MatIcon,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatDialogModule,Review,MatCardModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit{
public id!:number;
public showReview:boolean=false;
public quantityValue= new FormControl(0);
public product:productModel | undefined;
public products!:productModel[];
public categoryProducts!:productModel[];
public cart!:cartModel[];
public userCart!:cartModel[];
public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
  constructor( private activatedRoute: ActivatedRoute, private productService:Product, private authService:AuthService, private cartService:Cart,private dialog: MatDialog,private router:Router){}

ngOnInit(): void {
this.getProduct();
this.getCart();
  
} 

public getProduct(){
  this.authService.login(this.currentUser)
 this.products= this.productService.getProducts();
  this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '');
 this.product=this.products.find(data => data.productId === this.id)
  this.categoryProducts=this.products.filter(data => data.category === this.product?.category && data.productId !== this.product.productId)
 console.log("helo",this.categoryProducts)

}

public getCart(){
    this.authService.login(this.currentUser)
   this.cart= this.cartService.getCart();
   console.log("cart",this.cart)
   this.userCart=this.cart.filter(cart => cart.userId === this.currentUser.userId)
   console.log('usercart',this.userCart)
  }

public addToCart(product:productModel){
if(product.quantity>0 && this.quantityValue.value !== 0 && (product.quantity>this.quantityValue.value! )){
const quantity=Number(this.quantityValue.value)
   this.cartService.addToCart(product,quantity);
  alert("Added successfully")
  this.quantityValue.reset()
}
else if(product.quantity>0 && (product.quantity>this.quantityValue.value! )){
  alert("Add quantity")
}
else{
  alert("Out of Stock")
}  
}

public placeOrder(product?: productModel) {
    const dialogRef = this.dialog.open(OrderDialog, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
   this.getProduct()
  }); 
  }

  public showReviewStatus(){
    this.showReview=!this.showReview;
  }

  public cardClick(id:number){
    console.log(id)
    this.router.navigate(['/product-details/', id])
}
}
