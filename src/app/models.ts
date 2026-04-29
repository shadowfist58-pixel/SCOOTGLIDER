/* 
   DATA MODEL INTERFACES 
   Defines main structures used across the app 
*/

// SCOOTER MODEL
// Represents scooter details for display and transactions
export interface Scooter {
  id: string;
  name: string;
  model: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  rentPerHour: number;
  rentPerDay: number;
  category?: string; // optional scooter category
}

// CART ITEM MODEL
// Represents a single item in the user’s cart (buy or rent)
export interface CartItem {
  id: string;
  scooter: Scooter;
  type: 'buy' | 'rent';
  quantity?: number;
  rentDuration?: number;
  rentUnit?: 'hour' | 'day';
  deliveryType: 'pickup' | 'deliver';
  address?: string;
  total: number;
}

// ORDER MODEL
// Represents a completed order with status and timestamp
export interface Order {
  id: string;
  items: CartItem[];
  status: 'Pending' | 'Confirmed' | 'Canceled';
  placedAt: number;
  canCancelUntil: number;
}
