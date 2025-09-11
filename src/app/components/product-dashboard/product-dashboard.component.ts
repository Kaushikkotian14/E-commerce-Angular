
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../core/services/product.service';
import { productModel } from '../../core/models/product.model';
import { AddProductDialog } from '../add-product-dialog/add-product-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service.service';
import { userModel } from '../../core/models/user.model';
import { CategoryModel } from '../../core/models/category.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Cart } from '../../core/services/cart.service';
import { cartModel } from '../../core/models/cart.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-product-dashboard',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatGridListModule, MatDialogModule, MatMenuModule, MatSort, MatSortModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatInputModule, MatFormFieldModule, CurrencyPipe, MatButtonToggleModule,RouterLink],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})

export class ProductDashboard implements AfterViewInit, OnInit {
  public products: productModel[] = []
  public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')
  public category: string = 'All';
  public carts: cartModel[]=[];
  public userCarts: cartModel[]=[];
  public productDisplayedColumns: string[] = ['img', 'productName', 'description', 'category', 'cost', 'quantity', 'action'];
  public productDataSource = new MatTableDataSource<productModel>();
  public toggleOption: string ='All';
  public categories!: CategoryModel[]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: Product, private dialog: MatDialog, private router: Router, private authService: AuthService, private cartService: Cart, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCarts();
    
  }

  ngAfterViewInit() {
    this.productDataSource.sort = this.sort;
    this.productDataSource.paginator = this.paginator;
  }

  public getProducts() {
    this.authService.login(this.currentUser)
    this.products = this.productService.getProducts();
    this.productDataSource.data = this.products;
    this.categories = this.categoryService.getCategory()
  }

  public getCarts() {
    this.carts = this.cartService.getCart()
    console.log(this.carts);
    
    this.userCarts = this.carts.filter(cart => cart.userId === this.currentUser.userId)
    this.cartService.setCartQuantiy(this.userCarts.length)
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
            this.getProducts();
          } else {
            this.productService.addProduct(final);
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
    this.productDataSource.filter = searchTerm.trim().toLowerCase();
  }

  public productDetail(id: number) {
    this.router.navigate(['/product-details/', id])
  }

  public cardClick(id: number) {
    this.router.navigate(['/product-details/', id])
  }

  public categoryData(category: string) {
    this.category = category;
    if (category === 'All') {
      this.getProducts()
      this.toggle(this.toggleOption)
    } {
      this.productDataSource.data = this.products.filter(product => product.category === category)
      this.toggle(this.toggleOption)
    }
  }

  public toggle(value: string) {
    this.toggleOption = value
    if (this.category !== 'All') {
      if (this.toggleOption === "All") {
        this.productDataSource.data = this.products.filter(product => product.category === this.category)
      }
      else if (this.toggleOption === "In Stock") {
        this.productDataSource.data = this.products.filter(product => product.quantity > 0 && product.category === this.category)
      }
      else if(this.toggleOption === "Out of Stock"){
        this.productDataSource.data = this.products.filter(product => product.quantity === 0 && product.category === this.category)
      }
    } else {
      if (this.toggleOption === "All") {
        this.getProducts()
      }
      else if (this.toggleOption === "In Stock") {
        this.productDataSource.data = this.products.filter(product => product.quantity > 0)
      }
      else {
        this.productDataSource.data = this.products.filter(product => product.quantity === 0)
      }
    }
  }

}
