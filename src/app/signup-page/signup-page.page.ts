import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class SignupPage {

  /* 
    TOGGLE STATE 
    Controls whether the page shows login or signup form 
  */
  isLogin = true;

  /* 
    FORM DATA 
    Stores user input for login and signup fields 
  */
  loginData = { email: '', password: '' };
  signupData = { email: '', password: '', confirmPassword: '' };

  /* 
    ROUTER 
    Used to navigate between app pages 
  */
  constructor(private router: Router) {}

  /* 
    SWITCH FORM 
    Changes between login and signup view 
  */
  setLogin(val: boolean) {
    this.isLogin = val;
  }

  /* 
    LOGIN FUNCTION 
    Validates input and redirects user to home page 
  */
  login(event: Event) {
    event.preventDefault(); // prevents form reload

    if (this.loginData.email.trim() && this.loginData.password.trim()) {
      // Navigate to home page after successful login
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      alert('Please enter email and password.');
    }
  }

  /* 
    SIGNUP FUNCTION 
    Checks password match and redirects if valid 
  */
  signup(event: Event) {
    event.preventDefault(); // prevents form reload

    if (
      this.signupData.email.trim() &&
      this.signupData.password.trim() &&
      this.signupData.password === this.signupData.confirmPassword
    ) {
      // Navigate to home page after signup
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } 
    else if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match.');
    } 
    else {
      alert('Please fill all fields.');
    }
  }
}
