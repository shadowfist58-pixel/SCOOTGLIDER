import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage {
  scooter: any;
  deliveryOption: 'pickup' | 'delivery' = 'pickup';
  paymentMethod: string = 'Cash';
  notes: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.scooter = state?.['scooter'] || null;

  }

  async confirmOrder() {
    if (!this.scooter) return;

    // Prepare order object
    const newOrder = {
      id: Date.now(),
      scooter: this.scooter,
      type: 'purchase',
      rentType: null,
      duration: null,
      deliveryOption: this.deliveryOption,
      paymentMethod: this.paymentMethod,
      totalPrice: this.scooter.price,
      date: new Date(),
      status: 'Pending',
      notes: this.notes,
    };

    // Get existing orders from localStorage
    const ordersStr = localStorage.getItem('scootnow_orders');
    const orders = ordersStr ? JSON.parse(ordersStr) : [];

    // Add new order
    orders.push(newOrder);
    localStorage.setItem('scootnow_orders', JSON.stringify(orders));

    const toast = await this.toastCtrl.create({
      message: 'Order confirmed successfully!',
      duration: 2000,
      color: 'success',
    });
    toast.present();

    // Navigate to Ride History page
    this.router.navigate(['/ride-history']);
  }
}
