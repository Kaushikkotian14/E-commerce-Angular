import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { userModel } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, RouterLink, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{
 loginForm: FormGroup;
public users:userModel[]=[]
public currentUser!: userModel;

  constructor(private fb: FormBuilder, private router: Router ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      this.users = JSON.parse(userData)
    }
  }
  
  onSubmit() {
    const email = this.loginForm.value["email"]
    const password = this.loginForm.value["password"]
     
    if (this.loginForm.valid) {
     const currentUser = this.users.find((user:userModel)=> user.email == email && user.password == password);

     if(currentUser != undefined)
     localStorage.setItem('currentUser',JSON.stringify(currentUser));
    if(localStorage.getItem('currentUser')){
      alert('Login successful!');
      this.router.navigate(['/product-categories']);
    }
    else{
    alert("Invalid credentials");
  }
    }  
      
  }

  }


