import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public getCategory():CategoryModel[]{
    return JSON.parse(localStorage.getItem('category') || '[]')
  }

  public addCategory(category:CategoryModel){
    const categories = this.getCategory()
    categories.push(category)
    localStorage.setItem('category',JSON.stringify(categories))
  }

  public deleteCategory(id:number){
    const categories = this.getCategory();
  if(confirm("Are you sure you want to delete")){
    const index = categories.findIndex(data=> data.categoryId == id);
    categories.splice(index,1);
    localStorage.setItem('category',JSON.stringify(categories))
  }
  }
}
