import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

   isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public login(currentUser:userModel){
    localStorage.setItem('currentUser',JSON.stringify(currentUser))
      if(localStorage.getItem('currentUser')){
    this.isLoggedIn.next(true);
  }
}

public logOut(){
    localStorage.removeItem('currentUser')
    this.isLoggedIn.next(false);
    return
  }
}