import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { userModel } from '../../core/models/user.model';
import { passwordCheck } from '../../shared/validators/password.validator';

@Component({
  selector: 'app-sign-up',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, RouterLink, MatInputModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp implements OnInit {
  public signupForm: FormGroup;
  public users: userModel[] = [];
  public userObj!: userModel;


  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required,],
      phone: ['', Validators.required],},
       { validators: passwordCheck() });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      this.users = JSON.parse(userData)
    }
  }

  
  public passwordCheck(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (!password || !confirmPassword || password.value === confirmPassword.value) {
          return null;
        }
        return { passwordsMismatch: true };
      };
    }

  public onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        alert('Passwords do not match!');
      } else {
        console.log(this.signupForm.value);
        this.userObj={
          userId: this.users.length+1,
          username: this.signupForm.value["username"],
          email: this.signupForm.value["email"],
          password: this.signupForm.value["password"],
          phone: this.signupForm.value["phone"],
        }
        this.users.push(this.userObj);
        localStorage.setItem('UserData', JSON.stringify(this.users))
        console.log(this.users)
        this.router.navigate(['/login']);
      }
    }
  }
}
