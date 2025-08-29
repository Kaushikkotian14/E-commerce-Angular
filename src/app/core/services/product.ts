import { Injectable } from '@angular/core';
import { productModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class Product {
  public getProducts(): productModel[] {
    return JSON.parse(localStorage.getItem('products') || '[]')
  }

  public addProduct(product: productModel) {
    const products = this.getProducts();
    product.productId = products.length + 1;
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products))

  }

  public updateProduct(newProduct: productModel) {
    const products = this.getProducts();
    const updatedProduct = products.find(data => data.productId == newProduct.productId)
    if (updatedProduct != undefined) {
      updatedProduct.category = newProduct.category;
      updatedProduct.cost = newProduct.cost;
      updatedProduct.description = newProduct.description;
      updatedProduct.img = newProduct.img;
      updatedProduct.productName = newProduct.productName;
      updatedProduct.quantity = newProduct.quantity;
    }
    localStorage.setItem('products',JSON.stringify(products))
  }

  public deleteProduct(id:number){
    const products = this.getProducts();
  if(confirm("Are you sure you want to Delete")){
    const index = products.findIndex(data=> data.productId == id);
    products.splice(index,1);
    localStorage.setItem('products',JSON.stringify(products))
  }
  }

}
