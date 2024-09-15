interface IOrderItem {
    menuItemId: string;   // UUID string for menu item
    quantity: number;     // Must be a positive integer
  }
  
  // TypeScript Interface for the overall order
  interface IOrder {
    id?:string;
    items?: IOrderItem[];                       // Array of items with at least one item
    totalPrice: number;                        // Positive number for total price
    pizzaCount: number;                        // Positive number for pizza count
    sodaCount: number;                         // Positive number for soda count
    estimatedCompletionTime?: Date | null;     // Optional field for estimated completion time
  }