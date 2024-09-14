
  // Define the type for the menuItems object
  interface IMenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    type: 'PIZZA' | 'SODA';
  }
  
  type IMenuItems = {
    pizza: IMenuItem[];
    soda: IMenuItem[];
  };