import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './rental.page.html',
  styleUrls: ['./rental.page.scss'],
})
export class RentalPage implements OnInit {
  scooter: any;
  rentType: 'hour' | 'day' = 'hour';
  duration: number = 1;
  basePricePerHour = 150;
  basePricePerDay = 1000;
  totalPrice = 0;
  deliveryOption: 'delivery' | 'pickup' = 'pickup';
  paymentOption: 'cash' | 'gcash' | 'credit' = 'cash';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const nav = history.state;
    if (nav && nav['scooter']) {
      this.scooter = nav['scooter'];
    } else {
      this.router.navigate(['/home']);
    }
    this.updatePrice();
  }

  updatePrice() {
    this.totalPrice =
      this.rentType === 'hour'
        ? this.duration * this.basePricePerHour
        : this.duration * this.basePricePerDay;

    if (this.deliveryOption === 'delivery') {
      this.totalPrice += 200;
    }
  }

  async confirmRental() {
    const now = new Date();

    // ── Save to Orders ──────────────────────────────────────────
    const ordersStr = localStorage.getItem('scootnow_orders');
    const orders = ordersStr ? JSON.parse(ordersStr) : [];

    const newOrder = {
      type: 'rental',
      scooter: this.scooter,
      rentType: this.rentType,
      duration: this.duration,
      deliveryOption: this.deliveryOption,
      paymentOption: this.paymentOption,
      totalPrice: this.totalPrice,
      date: now,
      status: 'Pending'
    };

    orders.push(newOrder);
    localStorage.setItem('scootnow_orders', JSON.stringify(orders));

    // ── Save to Ride History ────────────────────────────────────
    const ridesStr = localStorage.getItem('scootnow_rides');
    const rides = ridesStr ? JSON.parse(ridesStr) : [];

    const durationLabel =
      this.rentType === 'hour'
        ? `${this.duration} hr${this.duration > 1 ? 's' : ''}`
        : `${this.duration} day${this.duration > 1 ? 's' : ''}`;

    const newRide = {
      id: 'R' + Date.now(),
      type: 'rental',
      from: this.deliveryOption === 'delivery' ? 'Delivery to your address' : 'Pick-up point',
      to: this.scooter.name,
      date: now.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit'
      }),
      distance: 0,
      duration: this.rentType === 'hour' ? this.duration * 60 : this.duration * 60 * 24,
      cost: this.totalPrice,
      status: 'Completed' as const,
      scooterId: this.scooter.id || this.scooter.name,
      rentType: this.rentType,
      durationLabel,
      deliveryOption: this.deliveryOption,
      paymentOption: this.paymentOption,
    };

    rides.unshift(newRide); // newest first
    localStorage.setItem('scootnow_rides', JSON.stringify(rides));

    const toast = await this.toastCtrl.create({
      message: `✅ Rental order placed for ${this.scooter.name}!`,
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    this.router.navigate(['/ride-history']);
  }
}