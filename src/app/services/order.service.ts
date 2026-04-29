import { Injectable } from '@angular/core';

export interface Order {
  id?: number;
  type: 'rental' | 'purchase';
  scooter: any;
  rentType?: 'hour' | 'day'; // optional for purchase
  duration?: number;         // optional for purchase
  deliveryOption?: 'delivery' | 'pickup';
  paymentOption?: 'cash' | 'gcash' | 'credit'; // ✅ Add this
  totalPrice: number;
  date: Date;
  status?: 'Pending' | 'Completed' | 'Delivered';
}



@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [
    // Sample static order (for testing)
    {
      id: 1,
      type: 'purchase',
      scooter: { name: 'wala', image: 'assets/scooter2.jpg' },
      totalPrice: 15999,
      date: new Date(),
      status: 'Delivered',
    },
  ];

  constructor() {}

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(orderData: Omit<Order, 'id' | 'status'>) {
    const newOrder: Order = {
      id: this.orders.length + 1,
      status: 'Pending',
      ...orderData,
    };
    this.orders.push(newOrder);
  }
}
