import { Injectable } from '@angular/core';
import { productModel } from '../models/product.model';
import { Q } from '@angular/cdk/keycodes';

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

  public updateQuantity(newProduct: productModel,quantity:number){
    const products = this.getProducts();
     const selectedProduct = products.find(data => data.productId == newProduct.productId)
        const uQuantity:productModel={
          productId:newProduct.productId,
        category : newProduct.category,
      cost : newProduct.cost,
      description : newProduct.description,
      img : newProduct.img,
      productName : newProduct.productName,
      quantity : newProduct.quantity - quantity,
        }
        if(uQuantity !== undefined){
        this.updateProduct(uQuantity)
          this.getProducts()
          console.log("updateQ",this.getProducts())
      }
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
