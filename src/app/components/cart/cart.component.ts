import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { cartModel } from '../../core/models/cart.model';
import { Cart as CartService } from '../../core/services/cart.service';
import { userModel } from '../../core/models/user.model';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../core/services/order.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDialog } from '../order-dialog/order-dialog.component';
import { productModel } from '../../core/models/product.model';
import { Product } from '../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatIcon, CurrencyPipe, MatButtonModule, MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class Cart implements OnInit {
  public cart: cartModel[] = [];
  public userCart: cartModel[] = [];
  public totalAmount: number = 0
  public product: productModel | undefined;
  public products: productModel[] = [];
  public cartProducts: productModel[] = [];
  public tempUserCart: cartModel[] = [];
  public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')
  public quantityAvailable: boolean = false;
  constructor(private cartService: CartService, private authService: AuthService, private router: Router, private orderService: Order, private dialog: MatDialog, private productService: Product, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCart();
  }

  public getProduct() {
    this.authService.login(this.currentUser)
    this.products = this.productService.getProducts();
  }

  public getCart() {
    this.authService.login(this.currentUser);
    this.cart = this.cartService.getCart();
    this.getProduct()
    this.userCart = this.cart.filter(cart => cart.userId === this.currentUser.userId)

    this.userCart.forEach(cartItem => {
      const foundProduct = this.products?.find(product => product.productId === cartItem.productId);
      if (foundProduct) {
        cartItem.product = foundProduct;
      }
      cartItem.totalCost = cartItem.quantity * cartItem.product?.cost!
      this.totalAmount = this.userCart.reduce((sum, cartItem) => {
        return sum + cartItem.quantity * cartItem.product?.cost!;
      }, 0);
    });
  }

  public removeCart(id: number) {
    this.cartService.deleteCart(id)
    this.getCart()
  }

  public cardClick(id: number) {
    this.router.navigate(['/product-details/', id])
  }



  public placeOrder() {
    this.userCart.forEach(cartItem => {

      if (cartItem.quantity > cartItem.product?.quantity!) {
        this.quantityAvailable = true
      }
    })
    if (this.quantityAvailable === false) {
      const dialogRef = this.dialog.open(OrderDialog, {
        width: '400px',
        data: {
          userCart: this.userCart,
          totalAmount: this.totalAmount
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cartService.setCartQuantiy(0)
        this.getCart();
        this.getProduct()
      });
    }

    if (this.quantityAvailable === true) {
      this.snackBar.open('Product is out of stock', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.quantityAvailable = false;
    }
  }
}


