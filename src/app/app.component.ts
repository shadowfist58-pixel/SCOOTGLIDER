/* 
   APP ROOT COMPONENT 
   Manages global routing and footer visibility 
*/
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonRouterOutlet,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonApp,
    IonRouterOutlet,
    IonFooter,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon
  ],
})
export class AppComponent {

  /* 
     FOOTER VISIBILITY STATE 
     Determines whether footer should appear 
  */
  showFooter = true;

  /* 
     CONSTRUCTOR 
     Subscribes to router events and hides footer on certain routes 
  */
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        const hiddenRoutes = ['/signup', '/login', '/product-detail', '/buy', '/landing'];
        this.showFooter = !hiddenRoutes.some(route => currentUrl.startsWith(route));

        console.log('Current route:', currentUrl, 'showFooter:', this.showFooter);
      });
  }

  /* 
     NAVIGATION FUNCTION 
     Handles page redirection from footer buttons 
  */
  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
