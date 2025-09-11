import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { userModel } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const emailPattern = /^\S.*$\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, RouterLink, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login implements OnInit {
  loginForm: FormGroup;
  public users: userModel[] = []
  public currentUser!: userModel;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      this.users = JSON.parse(userData)
    }
  }

  public onSubmit() {
    const email = this.loginForm.value["email"]
    const password = this.loginForm.value["password"]

    if (this.loginForm.valid) {
      const currentUser = this.users.find((user: userModel) => user.email == email && user.password == password);
      if (currentUser != undefined)
        this.authService.login(currentUser);
      if (localStorage.getItem('currentUser')) {
        this.snackBar.open('Login successful!', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/product-dashboard']);
      }
      else {
        this.snackBar.open('"Invalid Login Credentials", "Try again!"', 'Close', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    }
  }

}


