import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard/auth-guard';

export const routes: Routes = [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
       {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.Login),
      },
       {
        path: 'signup',
        loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUp),
      },
       {
        path: 'product-dashboard',
        loadComponent: () => import('./components/product-dashboard/product-dashboard.component').then(m => m.ProductDashboard),canActivate: [authGuard],
      },
       {
        path: 'product-details/:id',
        
        loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetails),
      },
       {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.Cart),canActivate: [authGuard],
      },
       {
        path: 'order-history',
        loadComponent: () => import('./components/order-history/order-history.component').then(m => m.OrderHistory),canActivate: [authGuard],
      },
             {
        path: 'product-categories',
        loadComponent: () => import('./components/product-categories/product-categories.component').then(m => m.ProductCategories),
      },

];
