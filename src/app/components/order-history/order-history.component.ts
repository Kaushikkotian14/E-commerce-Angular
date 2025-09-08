import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { orderModel } from '../../core/models/order.model';
import { Order } from '../../core/services/order.service';
import { userModel } from '../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  imports: [MatCardModule,MatIconModule,CurrencyPipe,DatePipe,MatButtonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistory implements OnInit{
public order!:orderModel[];
  public userOrder!:orderModel[];
  public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
constructor(private orderService:Order,private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.getOrder()
  }

  public getOrder(){
    this.authService.login(this.currentUser)
   this.order= this.orderService.getOrders();
   console.log("cart",this.order)
   this.userOrder=this.order.filter(order => order.userId === this.currentUser.userId)
   console.log('usercart',this.userOrder)
  }

  public removeOrder(id:number){
    this.orderService.deleteOrder(id)
    this.getOrder()
  }

public cardClick(id:number){
   this.router.navigate(['/product-details/', id])
}
}