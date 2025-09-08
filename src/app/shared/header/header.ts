import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
 import { MatButtonModule } from '@angular/material/button';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service.service';
import { Cart } from '../../core/services/cart.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule,RouterLink,MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  public isLoggedIn:boolean=false
  public cartQuantity!:number;
constructor(private router:Router, private authService:AuthService, private cartService:Cart){}

ngOnInit(): void {
    this.authService.isLoggedIn$().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.cartService.cartQuantity$().subscribe(quantity=>
    this.cartQuantity=quantity

    )
    console.log(this.cartQuantity)
  }

public logOut(){
  this.authService.logOut();
   window.location.replace('/login');
}

}
