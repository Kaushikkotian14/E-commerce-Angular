import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { cartModel } from '../../core/models/cart.model';
import { Cart as CartService } from '../../core/services/cart';
import { userModel } from '../../core/models/user.model';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../core/services/order';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDialog } from '../order-dialog/order-dialog';
import { productModel } from '../../core/models/product.model';
import { Product } from '../../core/services/product';


@Component({
  selector: 'app-cart',
  imports: [MatCardModule,MatIcon,CurrencyPipe,MatButtonModule,MatDialogModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit{
  public cart!:cartModel[];
  public userCart!:cartModel[];
  public totalAmount!: number
  public product:productModel | undefined;
  public products!:productModel[];
  public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
  constructor(private cartService:CartService,private authService:AuthService,private router:Router, private orderService:Order,private dialog:MatDialog, private productService:Product){}

  ngOnInit(): void {
    this.getCart();
  }

  public getProduct(){
     this.authService.login(this.currentUser)
 this.products= this.productService.getProducts();
  }

  public getCart(){
    this.authService.login(this.currentUser);
    
   this.cart= this.cartService.getCart();
   console.log("cart",this.cart)
   this.userCart=this.cart.filter(cart => cart.userId === this.currentUser.userId)
    this.totalAmount = this.userCart.reduce((sum, userCart) => sum + userCart.totalCost, 0);
   console.log('usercart',this.userCart)
  }

  public removeCart(id:number){
    this.cartService.deleteCart(id)
    // this.productService.updateQuantity(this.data,quantity)
    this.getCart()
  }

public cardClick(id:number){
   this.router.navigate(['/product-details/', id])
}

public placeOrder(){


    const dialogRef = this.dialog.open(OrderDialog, {
          width: '400px',
          data: {
    userCart: this.userCart,
    totalAmount: this.totalAmount
  }
        });
    
        dialogRef.afterClosed().subscribe(result => {
       this.getProduct()
      }); 
         
     
  
}
  }


