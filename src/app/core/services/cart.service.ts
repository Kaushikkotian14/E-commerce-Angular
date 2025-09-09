import { Injectable } from '@angular/core';
import { cartModel } from '../models/cart.model';
import { userModel } from '../models/user.model';
import { productModel } from '../models/product.model';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
private carts=this.getCart()
public userCarts=this.carts.filter(cart=>cart.userId===this.currentUser.userId)
private cartQuantity = new BehaviorSubject<number>(this.userCarts.length);

   cartQuantity$(): Observable<number> {
    return this.cartQuantity.asObservable();
  }

  public getCart():cartModel[] {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    }

  public addToCart(product: productModel,quantity:number,currentUser:userModel) {
  const carts = this.getCart();
  const cart: cartModel = {
    cartId: Math.floor(Math.random() * 100000),
    userId: currentUser.userId,
    userEmail: currentUser.email,
    productId:product.productId,
    quantity: quantity,
  };
  carts.push(cart);
  console.log(carts);
  localStorage.setItem('cart', JSON.stringify(carts));
}

   public updateCart(){

   }

    public deleteCart(id:number){
    const carts = this.getCart();
  if(confirm("Are you sure you want to remove item from cart")){
    const index = carts.findIndex(data=> data.cartId == id);
    carts.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(carts))
    this.cartQuantity.next(0)
    console.log("deleted",carts)
  }
  }

  public setCartQuantiy(quantity:number){
    this.cartQuantity.next(quantity)
    console.log(quantity)
  }
  
  public deleteUserCart(id:number){
     const carts = this.getCart();
     const newCart = carts.filter(cart=>cart.userId !== id)
         localStorage.setItem('cart',JSON.stringify(newCart))
  }
}
