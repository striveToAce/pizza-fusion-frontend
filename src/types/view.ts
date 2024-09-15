  // Define the type for a CartItem
  interface ICartItem {
    item: IMenuItem;
    qnty: number;
  }
  
  // Define the type for the state
  interface IViewsState {
    currentView: 'customer' | 'admin' | 'chef' | null;
    carts: ICartItem[];
    latestOrder:null | IOrder
  }
  