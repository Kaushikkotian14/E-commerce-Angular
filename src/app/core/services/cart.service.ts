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
private carts:cartModel[]=this.getCart()
private userCarts:cartModel[]=this.carts.filter(cart=>cart.userId === this.currentUser.userId)
private cartQuantity = new BehaviorSubject<number>(this.userCarts.length);

   cartQuantity$(): Observable<number> {
    return this.cartQuantity.asObservable();
   
  }

  public getCart():cartModel[] {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    }

  public addToCart(product: productModel,quantity:number,currentUser:userModel) {
  const carts = this.getCart();
  const findProduct = carts.find(cart=>cart.productId === product.productId && cart.userId === currentUser.userId)
  if(!findProduct){
  const cart: cartModel = {
    cartId: Math.floor(Math.random() * 100000),
    userId: currentUser.userId,
    productId:product.productId,
    quantity: quantity,
    isCouponApplied:false
  };
  carts.push(cart);
  console.log(carts);
  localStorage.setItem('cart', JSON.stringify(carts));
}else{
  const findCart = carts.find(cart=> cart.cartId === findProduct.cartId)
  
  const addCart:cartModel={
    ...findCart!, quantity: findCart?.quantity! + quantity
  }
  console.log("hl",addCart)
  this.updateCart(addCart)
}
}

  public updateCart(newCart:cartModel){
    const carts:cartModel[] = this.getCart();
    const updatedCart = carts.find(data => data.cartId == newCart.cartId)
    if (updatedCart != undefined) {
      updatedCart.cartId =  newCart.cartId
      updatedCart.productId = newCart.productId;
      updatedCart.quantity = newCart.quantity;
      updatedCart.userId = newCart.userId;
      updatedCart.totalCost =  newCart.totalCost;  
    }
    localStorage.setItem('cart', JSON.stringify(carts))
  }
   
  public updateCartFromCoupon(newCart:cartModel){
    const carts:cartModel[] = this.getCart();
    const updatedCart = carts.find(data => data.cartId == newCart.cartId)
    if (updatedCart != undefined) {
      updatedCart.cartId =  newCart.cartId
      updatedCart.productId = newCart.productId;
      updatedCart.quantity = newCart.quantity;
      updatedCart.userId = newCart.userId;
      updatedCart.totalCost =  newCart.totalCost;
      updatedCart.couponId = newCart.couponId;
      updatedCart.isCouponApplied=newCart.isCouponApplied ;
    }
    console.log("hrr",updatedCart)
    localStorage.setItem('cart', JSON.stringify(carts))
  }

    public deleteCart(id:number){
    const carts = this.getCart();
  if(confirm("Are you sure you want to remove item from cart")){
    const index = carts.findIndex(data=> data.cartId == id);
    carts.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(carts))
    this.cartQuantity.next(0)
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
