// Imports
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Scooter Interface
interface Scooter {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
}

// Component Setup
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

// Home Page Class
export class HomePage implements OnInit {
  // Variables
  searchQuery: string = '';
  segmentValue: string = 'all';

  // Scooter Data
  scooters: Scooter[] = [
    {
      id: 1,
      name: 'Yamaha Mio i125',
      brand: 'Yamaha',
      price: 85000,
      description: 'A lightweight scooter ideal for city rides, fuel-efficient and stylish.',
      image: 'assets/yamaha mio i125.png',
    },
    {
      id: 2,
      name: 'Honda Click 125i',
      brand: 'Honda',
      price: 90000,
      description: 'Smart scooter with digital meter panel, modern design, and great mileage.',
      image: 'assets/CLICK-125i-3.webp',
    },
    {
      id: 3,
      name: 'Suzuki Burgman Street',
      brand: 'Suzuki',
      price: 110000,
      description: 'Comfortable maxi-scooter feel with premium styling and practical features.',
      image: 'assets/suzuki burgman street.jpg',
    },

    {
      id: 4,
      name: 'Yamaha Sniper 155',
      brand: 'Yamaha',
      price: 164000,
      description: 'The Yamaha Sniper 155 is a high-performance underbone moped ("King of the Mopeds").',
      image: 'assets/yamaha sniper 155.webp',
    },
    {
      id: 5,
      name: 'Honda NAVi',
      brand: 'Honda',
      price: 56900,
      description: 'The Honda Navi is a 109cc "minimoto" scooter designed for city commuting.',
      image: 'assets/honda navi.jpg',
    },
    {
      id: 6,
      name: 'Suzuki Avenis',
      brand: 'Suzuki',
      price: 80400,
      description: 'The Suzuki Avenis is a 124cc "muscular sporty" scooter featuring sharp, aerodynamic styling and a fuel-efficient.',
      image: 'assets/suzuki avenis.jpg',
    },

    {
      id: 7,
      name: 'Yamaha YZF R15 155',
      brand: 'Yamaha',
      price: 164000,
      description: 'The Yamaha YZF-R15 155 is a high-performance entry-level sports bike.',
      image: 'assets/yamaha yzf r15.jpg',
    },
    {
      id: 8,
      name: 'Honda Giorno+',
      brand: 'Honda',
      price: 101900,
      description: 'The Honda Giorno+ is a 125cc stylish, retro-modern scooter designed for urban commuting.',
      image: 'assets/honda giorno+.png',
    },
    {
      id: 9,
      name: 'Suzuki Gixxer 250',
      brand: 'Suzuki',
      price: 182900,
      description: 'The Suzuki Gixxer 250 is a sharp, naked sportbike designed for agile urban commuting and performance.',
      image: 'assets/suzuki gixxer 250.webp',
    },
  ];

  // Filtered List
  filteredScooters: Scooter[] = [];

  // Constructor
  constructor(private router: Router) {}

  // OnInit Lifecycle Hook
  ngOnInit() {
    this.filteredScooters = [...this.scooters];
  }

  // Get unique scooter brands for category filter
  getCategories(): string[] {
    return Array.from(new Set(this.scooters.map(s => s.brand)));
  }

  // Filter scooters by search and segment
  filterScooters() {
    const query = this.searchQuery.toLowerCase();

    this.filteredScooters = this.scooters.filter(scooter => {
      const matchesSearch =
        scooter.name.toLowerCase().includes(query) ||
        scooter.brand.toLowerCase().includes(query);
      const matchesSegment =
        this.segmentValue === 'all' || scooter.brand === this.segmentValue;
      return matchesSearch && matchesSegment;
    });
  }

  // Navigate to product detail page
  goToDetail(scooter: Scooter) {
    this.router.navigate(['/product-detail', scooter.id]);
  }

  // Footer navigation handler
  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
