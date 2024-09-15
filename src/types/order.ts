interface IOrderItem {
  menuItemId: string; // UUID string for menu item
  quantity: number; // Must be a positive integer
  menuItem?:{
    name:string;
    size:string;
    price:number;
    description:string;
  }
}

// TypeScript Interface for the overall order
interface IOrder {
  id?: string;
  items?: IOrderItem[]; // Array of items with at least one item
  totalPrice: number; // Positive number for total price
  pizzaCount: number; // Positive number for pizza count
  sodaCount: number;
  status?: orderStatus;
  type?: "PIZZA" | "SODA"; // Positive number for soda count
  estimatedCompletionTime?: number; // Optional field for estimated completion time
}

type orderStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

interface IOrderState {
  clickedOrder: IOrder | null;
}
