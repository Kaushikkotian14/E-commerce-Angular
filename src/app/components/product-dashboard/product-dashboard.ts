
import { AfterViewInit, Component, ViewChild, inject, OnInit } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../core/services/product';
import { productModel } from '../../core/models/product.model';
import { AddProductDialog } from '../add-product-dialog/add-product-dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { userModel } from '../../core/models/user.model';


@Component({
  selector: 'app-product-dashboard',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatGridListModule, MatDialogModule, MatMenuModule, MatSort, MatSortModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatInputModule, MatFormFieldModule, CurrencyPipe],
  templateUrl: './product-dashboard.html',
  styleUrl: './product-dashboard.scss'
})

export class ProductDashboard implements AfterViewInit, OnInit {
  public products: productModel[] = []
  public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')

  public displayedColumns: string[] = ['img', 'productName', 'description', 'category', 'cost', 'quantity', 'action'];
  public dataSource = new MatTableDataSource<productModel>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private productService: Product, private dialog: MatDialog, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.getProducts();
    console.log(this.dataSource)

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('getProducts', this.dataSource.paginator)
  }


  public getProducts() {
    this.authService.login(this.currentUser)
    this.products = this.productService.getProducts();
    this.dataSource.data = this.products;
    console.log(this.dataSource)
  }

  public openDialog(product?: productModel) {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          const int = {
            cost: parseInt(result.cost),
            quantity: parseInt(result.quantity),
          };
          const parsedResult = Object.assign({}, result, int);
          const final: productModel = parsedResult;
          if (product) {
            this.productService.updateProduct(final);
            console.log("update", final)
            this.getProducts();
          } else {
            this.productService.addProduct(final);
            console.log("add", final)
            this.getProducts();
          }
        }
      }
    });
  }

  public deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.getProducts();
  }

  public search(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  public productDetail(id: number) {
    this.router.navigate(['/product-details/', id])
  }


}


