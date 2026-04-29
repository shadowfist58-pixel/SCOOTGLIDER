// -------------------------------------------------------------
//  IMPORTS
// -------------------------------------------------------------
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// -------------------------------------------------------------
//  INTERFACE
//  Defines the structure of a single ride record.
//  type === 'rental' entries come from the Rental page;
//  entries without a type (or type === 'ride') are GPS rides.
// -------------------------------------------------------------
interface Ride {
  id: string;
  type?: 'ride' | 'rental';
  from: string;
  to: string;
  date: string;
  distance: number;
  duration: number;
  cost: number;
  status: 'Completed' | 'Cancelled';
  scooterId: string;
  // rental-only extras
  rentType?: 'hour' | 'day';
  durationLabel?: string;
  deliveryOption?: 'pickup' | 'delivery';
  paymentOption?: 'cash' | 'gcash' | 'credit';
}

// -------------------------------------------------------------
//  COMPONENT
// -------------------------------------------------------------
@Component({
  selector: 'app-ride-history',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './ride-history.page.html',
  styleUrls: ['./ride-history.page.scss'],
})
export class RideHistoryPage implements OnInit {

  private router        = inject(Router);
  private alertCtrl     = inject(AlertController);
  private toastCtrl     = inject(ToastController);

  // All rides loaded from localStorage
  rides: Ride[] = [];

  // Filtered rides shown in the list
  filteredRides: Ride[] = [];

  // Active filter chip: 'all' | 'completed' | 'cancelled' | 'rental'
  activeFilter = 'all';

  // Modal state
  showDetail   = false;
  selectedRide: Ride | null = null;

  // Summary stats
  totalRides    = 0;
  totalDistance = 0;
  totalSpent    = 0;

  // -------------------------------------------------------------
  //  LIFECYCLE
  // -------------------------------------------------------------
  ngOnInit() {
    this.loadRides();
  }

  // -------------------------------------------------------------
  //  LOAD RIDES
  //  Reads from localStorage; seeds sample data if empty
  // -------------------------------------------------------------
  loadRides() {
    const stored = localStorage.getItem('scootnow_rides');

    if (stored) {
      this.rides = JSON.parse(stored);
    } else {
      // Sample data so the page looks good from the start
      this.rides = [
        {
          id: 'R001',
          from: 'Makati City',
          to: 'BGC, Taguig',
          date: 'Apr 28, 2026 · 9:15 AM',
          distance: 4.2,
          duration: 18,
          cost: 85,
          status: 'Completed',
          scooterId: 'SC-204'
        },
        {
          id: 'R002',
          from: 'Ortigas Center',
          to: 'Eastwood City',
          date: 'Apr 26, 2026 · 2:30 PM',
          distance: 3.8,
          duration: 15,
          cost: 72,
          status: 'Completed',
          scooterId: 'SC-117'
        },
        {
          id: 'R003',
          from: 'Quezon City Hall',
          to: 'SM North EDSA',
          date: 'Apr 24, 2026 · 11:00 AM',
          distance: 2.1,
          duration: 10,
          cost: 45,
          status: 'Cancelled',
          scooterId: 'SC-309'
        },
        {
          id: 'R004',
          from: 'Pasay MRT Station',
          to: 'Mall of Asia',
          date: 'Apr 22, 2026 · 6:45 PM',
          distance: 1.9,
          duration: 8,
          cost: 40,
          status: 'Completed',
          scooterId: 'SC-088'
        },
        {
          id: 'R005',
          from: 'Mandaluyong',
          to: 'San Juan City',
          date: 'Apr 20, 2026 · 8:00 AM',
          distance: 3.3,
          duration: 14,
          cost: 65,
          status: 'Completed',
          scooterId: 'SC-152'
        },
      ];
      localStorage.setItem('scootnow_rides', JSON.stringify(this.rides));
    }

    this.applyFilter();
    this.computeSummary();
  }

  // -------------------------------------------------------------
  //  FILTER
  //  Sets which rides are shown based on chip selection
  // -------------------------------------------------------------
  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.activeFilter === 'all') {
      this.filteredRides = [...this.rides];
    } else if (this.activeFilter === 'rental') {
      this.filteredRides = this.rides.filter(r => r.type === 'rental');
    } else {
      const statusMap: Record<string, string> = {
        completed: 'Completed',
        cancelled: 'Cancelled'
      };
      this.filteredRides = this.rides.filter(
        r => r.status === statusMap[this.activeFilter]
      );
    }
  }

  // -------------------------------------------------------------
  //  SUMMARY STATS
  //  Recalculate totals whenever rides change.
  //  Rentals count toward totalRides and totalSpent but not distance.
  // -------------------------------------------------------------
  computeSummary() {
    const completed = this.rides.filter(r => r.status === 'Completed');
    this.totalRides    = completed.length;
    this.totalDistance = parseFloat(
      completed.reduce((sum, r) => sum + (r.distance || 0), 0).toFixed(1)
    );
    this.totalSpent = completed.reduce((sum, r) => sum + r.cost, 0);
  }

  // -------------------------------------------------------------
  //  DETAIL MODAL
  // -------------------------------------------------------------
  viewRideDetail(ride: Ride) {
    this.selectedRide = ride;
    this.showDetail   = true;
  }

  closeDetail() {
    this.showDetail   = false;
    this.selectedRide = null;
  }

  // -------------------------------------------------------------
  //  CLEAR HISTORY
  //  Asks for confirmation before wiping all rides
  // -------------------------------------------------------------
  async clearHistory() {
    const alert = await this.alertCtrl.create({
      header: 'Clear History',
      message: 'Are you sure you want to delete all ride history? This cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Clear All',
          role: 'destructive',
          handler: () => {
            this.rides         = [];
            this.filteredRides = [];
            this.totalRides    = 0;
            this.totalDistance = 0;
            this.totalSpent    = 0;
            localStorage.removeItem('scootnow_rides');
            this.showToast('Ride history cleared.');
          }
        }
      ]
    });
    await alert.present();
  }

  // -------------------------------------------------------------
  //  TOAST HELPER
  // -------------------------------------------------------------
  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }
}