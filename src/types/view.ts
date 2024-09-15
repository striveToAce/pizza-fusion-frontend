  // Define the type for a CartItem
  interface ICartItem {
    item: IMenuItem;
    qnty: number;
  }
  
  type currentViewType = 'customer' | 'admin' | 'chef' | null;
  // Define the type for the state
  interface IViewsState {
    currentView: currentViewType;
    carts: ICartItem[];
    latestOrder:null | IOrder
  }
  