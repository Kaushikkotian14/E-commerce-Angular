import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard/auth-guard';

export const routes: Routes = [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
       {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login),
      },
       {
        path: 'signup',
        loadComponent: () => import('./components/sign-up/sign-up').then(m => m.SignUp),
      },
       {
        path: 'product-dashboard',
        loadComponent: () => import('./components/product-dashboard/product-dashboard').then(m => m.ProductDashboard),canActivate: [authGuard],
      },
       {
        path: 'product-details/:id',
        loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails),
      },
       {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart').then(m => m.Cart),canActivate: [authGuard],
      },
       {
        path: 'order-history',
        loadComponent: () => import('./components/order-history/order-history').then(m => m.OrderHistory),canActivate: [authGuard],
      },
             {
        path: 'product-categories',
        loadComponent: () => import('./components/product-categories/product-categories').then(m => m.ProductCategories),
      },

];
