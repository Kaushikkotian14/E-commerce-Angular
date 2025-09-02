import { Injectable } from '@angular/core';
import { cartModel } from '../models/cart.model';
import { userModel } from '../models/user.model';
import { productModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class Cart {
public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')

  public getCart():cartModel[] {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    }

   public addToCart(product: productModel,quantity:number) {
  const carts = this.getCart();
  const cart: cartModel = {
    cartId: carts.length + 1,
    userId: this.currentUser.userId,
    userEmail: this.currentUser.email,
    quantity: quantity,
    totalCost:quantity*product.cost,
    product: product
  };

  carts.push(cart);
  console.log(carts);
  localStorage.setItem('cart', JSON.stringify(carts));
}

    public deleteCart(id:number){
    const carts = this.getCart();
  if(confirm("Are you sure you want to remove item from cart")){
    const index = carts.findIndex(data=> data.cartId == id);
    carts.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(carts))
    console.log("deleted",carts)
  }
  }
  
}
