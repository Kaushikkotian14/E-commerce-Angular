import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { productModel } from '../models/product.model';
import { orderModel } from '../models/order.model';
import { Product } from '../../core/services/product';
import { Inject } from '@angular/core';
import { cartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class Order {
  public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
   public productService=Inject(Product);

    public getOrders():orderModel[] {
        return JSON.parse(localStorage.getItem('orders') || '[]')
      }
  
     public addOrder(cart: cartModel[],quantity:number,address:string) {
    const orders = this.getOrders();
    const order: orderModel = {
      orderId: orders.length + 1,
      userId: this.currentUser.userId,
      userEmail: this.currentUser.email,
      orderedDate:new Date(),
      quantity: quantity,
      totalCost:quantity,
      address:address,
      cart:cart
    };
    orders.push(order);
    console.log("orders",orders);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  public addOrderByCart(cart:cartModel[], totalAmount:number,address:string){
    const orders = this.getOrders();
    const order: orderModel = {
      orderId: orders.length + 1,
      userId: this.currentUser.userId,
      userEmail: this.currentUser.email,
      orderedDate:new Date(),
      totalCost:totalAmount,
      address:address,
      cart:cart,
    };
    orders.push(order);
    console.log("orders",orders);
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  public deleteOrder(id:number){
    const orders = this.getOrders();
  if(confirm("Are you sure you want to remove")){
    const index = orders.findIndex(data=> data.orderId== id);
    orders.splice(index,1);
    localStorage.setItem('orders',JSON.stringify(orders))
  }
  }
}
