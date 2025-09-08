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
import { CategoryService } from '../../core/services/category.service';
import { CategoryModel } from '../../core/models/category.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-categories',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule,MatMenuModule,MatSelectModule,MatIcon],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss'
})
export class ProductCategories {
categoryForm: FormGroup;
  public categories: CategoryModel[] = [];
  public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private categoryService:CategoryService) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
     this.getCategory()
  }

  public getCategory(){
    this.authService.login(this.currentUser)
    this.categories=this.categoryService.getCategory()
  }

  public addCategory() {
    const categorydata = String(this.categoryForm.value["category"])
    const categoryItem:CategoryModel={
      categoryId: Math.floor(Math.random() * 100000),
      categoryName: categorydata
    };
    this.categoryService.addCategory(categoryItem)
    this.categoryForm.get('category')?.reset('');
    this.getCategory()
  }

  public deleteCategory(categoryId:number){
   this.categoryService.deleteCategory(categoryId)
   this.getCategory()
  }
}
