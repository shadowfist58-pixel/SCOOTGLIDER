import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  scooter: any;
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // Mock product data
    const scooters = [
      {
        id: '2',
        name: 'Honda Click 125i',
        brand: 'Honda',
        price: 85000,
        rentPrice: 600,
        description:
          'The Honda Click 125i is a stylish, fuel-efficient scooter ideal for city rides. It features LED headlights, smart key system, and sporty design perfect for daily commuting.',
        image: 'assets/CLICK-125i-3.webp',
      },
      {
        id: '1',
        name: 'Yamaha Mio i125',
        brand: 'Yamaha',
        price: 83000,
        rentPrice: 550,
        description:
          'The Yamaha Mio i 125 offers agility and reliability with a sleek body design and Blue Core engine technology, ensuring excellent performance and low fuel consumption.',
        image: 'assets/yamaha mio i125.png',
      },
      {
        id: '3',
        name: 'Suzuki Burgman Street 125',
        brand: 'Suzuki',
        price: 92000,
        rentPrice: 700,
        description:
          'The Suzuki Burgman Street 125 is a premium scooter with a maxi-style design. It provides great comfort, a digital meter, and ample under-seat storage for longer rides.',
        image: 'assets/suzuki burgman street.jpg',
      },
      {
        id: '4',
        name: 'Yamaha Sniper 155',
        brand: 'Yamaha',
        price: 164000,
        rentPrice: 850,
        description:
          'This commuter does get a decent amount of features which includes the basics such as an LED headlamp, tail lamp, and indicator lights for that added stash of style and superior vision, especially during night time. Plus, it also gets a modern touch of digital gauges.',
        image: 'assets/yamaha sniper 155.webp',
      },
      {
        id: '5',
       name: 'Honda NAVi',
       brand: 'Honda',
       price: 56900,
       rentPrice: 500,
       description:
          'The Honda NAVi is designed to adapt to your unique personality. Its effortless customization options ensure that each ride reflects who you are—whether you’re classy, bold, free, or cool.',
        image: 'assets/honda navi.jpg',
      },
      {
        id: '6',
        name: 'Suzuki Avenis',
        brand: 'Suzuki',
        price: 80400,
        rentPrice: 550,
        description:
          'The Avenis is a muscular and sporty scooter that is sure to captivate every rider’s attention with its tough, bold, and aerodynamic design powered by Suzuki’s reliable technology. This fuel-efficient and affordable motorcycle is fitted for the modern riders active and on-the-go lifestyle. It is the perfect mode of transport for people who would like to do more and achieve more in life— a scooter meant for those who want to follow their passion!',
        image: 'assets/suzuki avenis.jpg',
      },
      {
        id: '7',
        name: 'Yamaha YZF R15 155',
        brand: 'Yamaha',
        price: 164000,
        rentPrice: 880,
        description:
          'Despite being Yamaha’s entry-level sports bike, this sporty two-wheeler comes Standard with a number of features including LED headlamp and tail lamp for that added stash of style and superior vision, especially during night time. Moreover, it also gets a modern touch of digital gauges.',
        image: 'assets/yamaha yzf r15.jpg',
      },
      {
        id: '8',
        name: 'Honda Giorno+',
        brand: 'Honda',
        price: 101900,
        rentPrice: 600,
        description:
          'Ride in retro sophistication with the Honda Giorno+, where timeless elegance meets high-performance engineering. Designed for the fashion-forward Filipino, this scooter is more than just a ride, it’s a lifestyle choice that radiates enduring style, ensuring every journey reflects a class that last.',
        image: 'assets/honda giorno+.png',
      },
      {
        id: '9',
        name: 'Suzuki Gixxer 250',
        brand: 'Suzuki',
        price: 182900,
        rentPrice: 900,
        description:
          'The Suzuki Gixxer 250 is a sharp, naked sportbike featuring a 249cc oil-cooled, single-cylinder SOHC engine producing 26.5 PS at 9,000 rpm and 22.6 Nm of torque. It is designed for agile urban commuting and performance, featuring a 6-speed transmission, fuel injection, dual-channel ABS, LED lighting, and a 12L fuel.',
        image: 'assets/suzuki gixxer 250.webp',
      },
    ];

    // Find the scooter by ID
    this.scooter = scooters.find((s) => s.id === id);
  }

  /** Navigate to Buy Page with the scooter data */
  buyNow() {
    this.router.navigate(['/buy'], { state: { scooter: this.scooter } });
  }

  /** Navigate to Rent Page with the scooter data */
  goToRent() {
    this.router.navigate(['/rental'], { state: { scooter: this.scooter } });
  }
}
