import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class OrdersPage {
  /*
    TAB STATE
    Tracks which tab is currently selected (Orders or Liked)
  */
  selectedTab: string = 'orders';

  /*
    ORDERS DATA
    Stores all user orders retrieved from local storage
  */
  orders: any[] = [];

  /*
    LIKED PRODUCTS DATA
    Stores all user liked scooters retrieved from local storage
  */
  likedProducts: any[] = [];

  constructor() {}

  /*
    INITIALIZATION
    Loads orders and liked items from local storage when the page starts
  */
  ngOnInit() {
    // Clear old orders (uncomment if needed)
    // localStorage.removeItem('scootnow_orders');

    // Load orders
    const ordersStr = localStorage.getItem('scootnow_orders');
    this.orders = ordersStr ? JSON.parse(ordersStr) : [];

    // Load liked products
    const likedStr = localStorage.getItem('scootnow_liked');
    this.likedProducts = likedStr ? JSON.parse(likedStr) : [];
  }

  /*
    RENTAL CHECK
    Returns true if the order type is rental
  */
  isRental(order: any): boolean {
    return order.type === 'rental';
  }

  /*
    PURCHASE CHECK
    Returns true if the order type is purchase
  */
  isPurchase(order: any): boolean {
    return order.type === 'purchase';
  }

  /*
    CLEAR ORDERS
    Removes all stored orders and clears them from the page
  */
  clearOrders() {
    this.orders = [];
    localStorage.removeItem('scootnow_orders');
  }
}
