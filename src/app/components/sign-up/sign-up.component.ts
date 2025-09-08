import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { userModel } from '../../core/models/user.model';
import { passwordCheck } from '../../shared/validators/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

const phonePattern = /^(\d{10})$/;
const emailPattern = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

@Component({
  selector: 'app-sign-up',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, RouterLink, MatInputModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUp implements OnInit {
  public signupForm: FormGroup;
  public users: userModel[] = [];
  public userObj!: userModel;
  public checkPasswordValue!: boolean;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern),]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required,],
      phone: ['', [Validators.required, Validators.pattern(phonePattern),]],
    },
    );
  }
  // { validators: passwordCheck() }
  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      this.users = JSON.parse(userData)
    }
  }

  public passwordCheck() {
    const password = String(this.signupForm.value.password)
    const confirmPassword = String(this.signupForm.value.confirmPassword)
    console.log(password, confirmPassword)
    if (password && confirmPassword && password !== confirmPassword) {
      this.checkPasswordValue = true
    } else {
      this.checkPasswordValue = false
    }
  }

  public onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        this.snackBar.open('Passwords do not match!', 'Close', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
        console.log(this.signupForm.value);
        this.userObj = {
          userId: Math.floor(Math.random() * 100000),
          username: this.signupForm.value["username"],
          email: this.signupForm.value["email"],
          password: this.signupForm.value["password"],
          phone: this.signupForm.value["phone"],
        }
        this.users.push(this.userObj);
        localStorage.setItem('UserData', JSON.stringify(this.users))
        console.log(this.users)
        this.snackBar.open('Registered Successfully', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/login']);
      }
    }
  }
}
