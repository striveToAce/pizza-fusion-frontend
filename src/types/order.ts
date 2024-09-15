export interface IOrderItem {
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
export interface IOrder {
  id?: string;
  items?: IOrderItem[]; // Array of items with at least one item
  totalPrice: number; // Positive number for total price
  pizzaCount: number; // Positive number for pizza count
  sodaCount: number;
  status?: orderStatus;
  type?: "PIZZA" | "SODA"; // Positive number for soda count
  estimatedCompletionTime?: number; // Optional field for estimated completion time
}

export interface IEstimateTimeResponse {
  estimatedTime:number;
}

export type orderStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface IOrderState {
  clickedOrder: IOrder | null;
}
