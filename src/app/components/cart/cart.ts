import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { cartModel } from '../../core/models/cart.model';
import { Cart as CartService } from '../../core/services/cart';
import { userModel } from '../../core/models/user.model';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [MatCardModule,MatIcon,CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit{
  public cart!:cartModel[];
  public userCart!:cartModel[];
  public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
  constructor(private cartService:CartService,private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.getCart();
  }

  public getCart(){
    this.authService.login(this.currentUser)
   this.cart= this.cartService.getCart();
   console.log("cart",this.cart)
   this.userCart=this.cart.filter(cart => cart.userId === this.currentUser.userId)
   console.log('usercart',this.userCart)
  }

  public removeCart(id:number){
    this.cartService.deleteCart(id)
    this.getCart()
  }

public cardClick(id:number){
   this.router.navigate(['/product-details/', id])
}
}
