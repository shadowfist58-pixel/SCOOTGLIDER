import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular'; // Removed Button
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../models';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Checkout</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div *ngIf="cartItems.length; else empty">
        <ion-list>
          <ion-item *ngFor="let item of cartItems">
            {{ item.scooter.name }} - ₱{{ item.total }}
          </ion-item>
        </ion-list>
        <p>Total: ₱{{ getTotal() }}</p>
        <ion-button expand="full" (click)="confirm()">Confirm Order</ion-button>
      </div>
      <ng-template #empty>
        <p>No items in cart.</p>
      </ng-template>
    </ion-content>
  `,
  styles: []
})
export class CheckoutModalComponent {
  @Input() cartItems: CartItem[] = [];

  constructor(private modalCtrl: ModalController) {}

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.total || 0), 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss({ confirmed: true });
  }
}
