import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class LandingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // ⏳ Auto-navigate to signup after 3 seconds
    setTimeout(() => {
      this.router.navigateByUrl('/signup');
    }, 10000); // 👈 Adjust time here (in milliseconds)
  }

  navigateToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
