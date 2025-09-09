import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { productModel } from '../../core/models/product.model';
import { Product } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth-service.service';
import { userModel } from '../../core/models/user.model';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cart } from '../../core/services/cart.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { OrderDialog } from '../order-dialog/order-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Review } from '../review/review.component';
import { cartModel } from '../../core/models/cart.model';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, MatButton, MatIcon, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, Review, MatCardModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetails implements OnInit {
  public productId!: number;
  public showReview: boolean = false;
  public quantityValue = new FormControl(0);
  public product: productModel | undefined;
  public products: productModel[] = [];
  public categoryProducts!: productModel[];
  public cart!: cartModel[];
  public userCart!: cartModel[];
  public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')
  constructor(private activatedRoute: ActivatedRoute, private productService: Product, private authService: AuthService, private cartService: Cart, private dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProduct();
    this.getCart();
  }

  public getProduct() {
    this.authService.login(this.currentUser)
    this.products = this.productService.getProducts();
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '');
    // this.activatedRoute.params.subscribe((params)=>{    
    //    this.id=Number(params['id'])

    // })

    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //     this.id = Number(params.get('id'));
    //     console.log(typeof(this.id),this.id,params)
    //   });
    this.product = this.products.find(data => data.productId === this.productId)
    this.categoryProducts = this.products.filter(data => data.category === this.product?.category && data.productId !== this.product.productId)

  }

  public getCart() {
    this.authService.login(this.currentUser)
    this.cart = this.cartService.getCart();
    this.userCart = this.cart.filter(cart => cart.userId === this.currentUser.userId)
  }

  public addToCart(product: productModel) {
    if (product.quantity > 0 && Number(this.quantityValue.value) > 0 && (product.quantity >= this.quantityValue.value!)) {
      const quantity = Number(this.quantityValue.value)
      this.cartService.addToCart(product, quantity,this.currentUser);
      this.getCart()
      this.cartService.setCartQuantiy(this.userCart.length)
      this.snackBar.open('Product added to cart successfully', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.quantityValue.reset()
    }
    else if (product.quantity > 0 && (product.quantity > this.quantityValue.value!)) {
      this.snackBar.open('Add proper quantity', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
    else {
      this.snackBar.open('Out of Stock', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  public placeOrder(product?: productModel) {
    const dialogRef = this.dialog.open(OrderDialog, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProduct()
    });
  }

  public showReviewStatus() {
    this.showReview = !this.showReview;
  }

  public cardClick(id: number) {
    this.router.navigate(['/product-details/', id]);
    this.getProduct()
  }
}


// this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
//       this.id = Number(params.get('id'));
//     });