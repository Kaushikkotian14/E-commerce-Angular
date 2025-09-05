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

const phonePattern=/^(\d{10})$/;
const emailPattern=/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

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
  public checkPasswordValue!:boolean;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern),]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required,],
      phone: ['', Validators.required, Validators.pattern(phonePattern),],},
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
console.log(password,confirmPassword)
        if (password && confirmPassword && password !== confirmPassword) {
          this.checkPasswordValue=true
          console.log("diff")
        }else{
          this.checkPasswordValue=false
           console.log("same")
        }
        
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
