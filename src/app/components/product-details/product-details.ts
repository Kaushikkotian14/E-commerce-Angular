import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productModel } from '../../core/models/product.model';
import { Product } from '../../core/services/product';
import { AuthService } from '../../core/services/auth-service';
import { userModel } from '../../core/models/user.model';
 

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit{
public id!:number;
public product:productModel | undefined;
public products!:productModel[];
public currentUser:userModel=JSON.parse(localStorage.getItem('currentUser') || '{}')
  constructor( private activatedRoute: ActivatedRoute, private productService:Product, private authService:AuthService){}

ngOnInit(): void {
this.getProduct()
  
} 

public getProduct(){
  this.authService.login(this.currentUser)
 this.products= this.productService.getProducts();
  this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '');
 this.product=this.products.find(data => data.productId === this.id)
 console.log("helo",this.product)

}

}
