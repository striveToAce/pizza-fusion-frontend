
  // Define the type for the menuItems object
  export interface IMenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    type: 'PIZZA' | 'SODA';
  }

  export interface IMenuItemPayload {
    id?: string;
    name: string;
    description?: string;
    price: number;
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    type: 'PIZZA' | 'SODA';
  }
  
  export type IMenuItems = {
    pizza: IMenuItem[];
    soda: IMenuItem[];
  };