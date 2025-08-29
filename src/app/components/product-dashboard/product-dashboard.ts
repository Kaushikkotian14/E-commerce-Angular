import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../core/services/product';
import { productModel } from '../../core/models/product.model';
import { AddProductDialog } from '../add-product-dialog/add-product-dialog';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-product-dashboard',
  imports: [MatButtonModule,MatIconModule,MatCardModule,MatGridListModule,MatDialogModule,MatMenuModule],
  templateUrl: './product-dashboard.html',
  styleUrl: './product-dashboard.scss'
})

export class ProductDashboard implements OnInit {
products:productModel[]=[]

constructor(private productService:Product,private dialog: MatDialog){}


ngOnInit(): void {
 this.getProducts();
  
}

public getProducts(){
 this.products= this.productService.getProducts()
 console.log(this.products)
}

  public openDialog(product?: productModel) {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.productService.updateProduct(result);
           this.getProducts();
        } else {
          this.productService.addProduct(result);
           this.getProducts();
        }
      }
    });
  }

  deleteProduct(id:number){
  this.productService.deleteProduct(id);
   this.getProducts();
  }
}
