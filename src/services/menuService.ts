// services/menuService.ts
import apiCall from '../lib/axios'; // Import the common API call utility

// Fetch menu items by type (PIZZA or SODA)
export const getMenuItemsByType = async (type: 'pizza' | 'soda'): Promise<IMenuItem[]> => {
  return await apiCall({
    url: `get-items?type=${type}`, // Endpoint to fetch items by type
    method: 'GET',
    service: 'menu',
  });
};

// Fetch a single menu item by ID
export const getMenuItemById = async (id: string): Promise<IMenuItem> => {
  return await apiCall({
    url: `item-details/${id}`, // API endpoint to fetch item by ID
    method: 'GET',
    service: 'menu',
  });
};
