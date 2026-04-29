// -------------------------------------------------------------
//  IMPORTS
// -------------------------------------------------------------
import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';

// -------------------------------------------------------------
//  INTERFACE
// -------------------------------------------------------------
interface UserProfile {
  name: string;
  email: string;
  contact: string;
  address: string;
  lat?: number;
  lng?: number;
  image?: string;
}

// -------------------------------------------------------------
//  COMPONENT SETUP
// -------------------------------------------------------------
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit, OnDestroy {

  profile: UserProfile = {
    name: 'Mark Clinton Gasmeña',
    email: 'stark99@gmail.com',
    contact: '+63 912 345 6789',
    address: '123 Mamamo, Makati City, Cordillera, Philippines',
    image: 'assets/hhhh.jpeg'
  };

  editUser = { ...this.profile };
  addressInput = this.profile.address;
  showModal = false;
  showMap = false;
  map?: L.Map;
  marker?: L.Marker;
  markerCoords = { lat: 14.5995, lng: 120.9842 };

  private toastCtrl = inject(ToastController);
  private router    = inject(Router);

  // -------------------------------------------------------------
  //  LIFECYCLE
  // -------------------------------------------------------------
  ngOnInit() {
    this.loadProfile();
  }

  ngAfterViewInit() {
    if (this.showMap) this.initMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  // -------------------------------------------------------------
  //  PROFILE FUNCTIONS
  // -------------------------------------------------------------
  loadProfile() {
    const stored = localStorage.getItem('scootnow_profile');
    if (stored) this.profile = JSON.parse(stored);
  }

  openEditModal() {
    this.editUser = { ...this.profile };
    this.showModal = true;
  }

  saveProfile() {
    localStorage.setItem('scootnow_profile', JSON.stringify(this.profile));
    this.showModal = false;
    this.showToast('Profile updated successfully!');
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1200,
      color: 'success',
    });
    toast.present();
  }

  // -------------------------------------------------------------
  //  NAVIGATE TO RIDE HISTORY  ← new
  // -------------------------------------------------------------
  goToHistory() {
    this.router.navigateByUrl('/ride-history');
  }

  // -------------------------------------------------------------
  //  MAP FUNCTIONS
  // -------------------------------------------------------------
  toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      setTimeout(() => this.initMap(), 300);
    }
  }

  initMap() {
    if (this.map) {
      this.map.invalidateSize();
      return;
    }

    setTimeout(() => {
      this.map = L.map('profileMap', {
        center: [this.markerCoords.lat, this.markerCoords.lng],
        zoom: 13,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      this.marker = L.marker(
        [this.markerCoords.lat, this.markerCoords.lng],
        { draggable: true }
      )
        .addTo(this.map)
        .bindPopup('Your Location')
        .openPopup();

      this.map.invalidateSize();
    }, 100);
  }

  saveAddress() {
    this.profile.address = this.addressInput;
    this.markerCoords = { lat: 14.676, lng: 121.0437 };
    this.showModal = false;
    setTimeout(() => this.updateMapMarker(), 0);
  }

  updateMapMarker() {
    if (this.map && this.marker) {
      this.map.setView([this.markerCoords.lat, this.markerCoords.lng], 13);
      this.marker.setLatLng([this.markerCoords.lat, this.markerCoords.lng]);
      this.marker.bindPopup('Your Location').openPopup();
    }
  }

  // -------------------------------------------------------------
  //  IMAGE HANDLING
  // -------------------------------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.image = reader.result as string;
        localStorage.setItem('scootnow_profile', JSON.stringify(this.profile));
      };
      reader.readAsDataURL(file);
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/hhhh.jpeg';
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.click();
  }

  // -------------------------------------------------------------
  //  LOGOUT
  // -------------------------------------------------------------
  logout() {
    localStorage.removeItem('scootnow_profile');
    this.router.navigateByUrl('/signup', { replaceUrl: true });
  }
}