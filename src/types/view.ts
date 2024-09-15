import { IMenuItem } from "./menu";
import { IOrder } from "./order";

  // Define the type for a CartItem
  export interface ICartItem {
    item: IMenuItem;
    qnty: number;
  }
  
  export type currentViewType = 'customer' | 'admin' | 'chef' | null;
  // Define the type for the state
  export interface IViewsState {
    currentView: currentViewType;
    carts: ICartItem[];
    latestOrder:null | IOrder
  }
  