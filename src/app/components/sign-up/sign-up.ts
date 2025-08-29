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
  selector: 'app-sign-up',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, RouterLink, MatInputModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp implements OnInit {
  public form: FormGroup;
  public users: userModel[] = [];
  public userObj!: userModel;


  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      this.users = JSON.parse(userData)
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        alert('Passwords do not match!');
      } else {
        console.log(this.form.value);
        this.userObj={
          userId: this.users.length+1,
          username: this.form.value["username"],
          email: this.form.value["email"],
          password: this.form.value["password"],
          phone: this.form.value["phone"],
        }
        this.users.push(this.userObj);
        localStorage.setItem('UserData', JSON.stringify(this.users))
        console.log(this.users)
        this.router.navigate(['/login']);
      }
    }
  }
}
