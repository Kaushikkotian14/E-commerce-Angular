import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
 import { MatButtonModule } from '@angular/material/button';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public isLoggedin=false
constructor(private router:Router){}

public logOut(){
  localStorage.removeItem('currentUser')
  this.router.navigate(['/login']);
}
}
