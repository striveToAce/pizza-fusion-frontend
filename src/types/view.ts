interface IMenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    type: 'PIZZA' | 'SODA';
  }
  
  // Define the type for a CartItem
  interface ICartItem {
    item: IMenuItem;
    qnty: number;
  }
  
  // Define the type for the state
  interface IViewsState {
    currentView: 'customer' | 'admin' | 'chef' | null;
    carts: ICartItem[];
  }
  