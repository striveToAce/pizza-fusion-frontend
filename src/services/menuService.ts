// services/menuService.ts
import { IMenuItem, IMenuItemPayload } from '@/types/menu';
import apiCall from '../lib/axios'; // Import the common API call utility

// Fetch menu items by type (PIZZA or SODA)
export const getMenuItemsByType = async (type: 'pizza' | 'soda'): Promise<IMenuItem[]> => {
  return await apiCall({
    url: `get-items?type=${type}`, // Endpoint to fetch items by type
    method: 'GET',
    service: 'menu',
  });
};


export const addMenuItem = async (payload:IMenuItemPayload): Promise<IMenuItem> => {
  return await apiCall({
    url: ``, // API endpoint to fetch item by ID
    method: 'POST',
    data:payload,
    service: 'menu',
  });
};


// Fetch a single menu item by ID
export const updateMenuItem = async (id: string,payload:IMenuItemPayload): Promise<IMenuItem> => {
  return await apiCall({
    url: `update-item/${id}`, // API endpoint to fetch item by ID
    method: 'PUT',
    data:payload,
    service: 'menu',
  });
};

export const deleteMenuItemById = async (id: string): Promise<IMenuItem> => {
  return await apiCall({
    url: `remove-item/${id}`, // API endpoint to fetch item by ID
    method: 'DELETE',
    service: 'menu',
  });
};

