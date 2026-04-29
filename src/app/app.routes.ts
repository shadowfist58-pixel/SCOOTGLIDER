/* 
   APP ROUTING CONFIGURATION 
   Defines navigation paths and component routes 
*/
import { Routes } from '@angular/router';

export const routes: Routes = [

  /* 
     DEFAULT ROUTE 
     Redirects empty path to landing page 
  */
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

  /* 
     LANDING PAGE ROUTE 
     Displays the introductory landing page 
  */
  {
    path: 'landing',
    loadComponent: () => import('./landing/landing.page').then(m => m.LandingPage)
  },

  /* 
     SIGNUP / LOGIN ROUTE 
     Handles user registration and login 
  */
  {
    path: 'signup',
    loadComponent: () => import('./signup-page/signup-page.page').then(m => m.SignupPage)
  },

  /* 
     HOME PAGE ROUTE 
     Displays main scooter list or dashboard 
  */
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },

  /* 
     ORDERS PAGE ROUTE 
     Shows user’s rental and purchase history 
  */
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage)
  },

  /* 
     PROFILE PAGE ROUTE 
     Displays and updates user information 
  */
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },

  /* 
     RIDE HISTORY ROUTE 
     Displays the user ride history page 
  */
  {
    path: 'ride-history',
    loadComponent: () => import('./ride-history/ride-history.page').then(m => m.RideHistoryPage)
  },

  /* 
     PRODUCT DETAIL ROUTE 
     Shows details for selected scooter (dynamic route) 
  */
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },

  /* 
     RENTAL PAGE ROUTE 
     Displays available scooters for rent 
  */
  {
    path: 'rental',
    loadComponent: () => import('./rental/rental.page').then(m => m.RentalPage)
  },

  /* 
     BUY PAGE ROUTE 
     Displays scooters available for purchase 
  */
  {
    path: 'buy',
    loadComponent: () => import('./buy/buy.page').then(m => m.BuyPage)
  },

  /* 
     FALLBACK ROUTE 
     Redirects unknown paths to signup page 
  */
  {
    path: '**',
    redirectTo: 'signup',
    pathMatch: 'full'
  }
];
