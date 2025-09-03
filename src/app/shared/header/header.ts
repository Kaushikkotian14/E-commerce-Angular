import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
 import { MatButtonModule } from '@angular/material/button';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  public isLoggedIn=false
constructor(private router:Router, private authService:AuthService){}

ngOnInit(): void {
    this.authService.isLoggedIn$().subscribe(status => {
      this.isLoggedIn = status;
    });
    console.log(this.isLoggedIn)
  }


public logOut(){
  this.authService.logOut();
   window.location.replace('/login');
  
  
}

}
