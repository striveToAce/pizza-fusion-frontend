// services/menuService.ts
import apiCall from '../lib/axios'; // Import the common API call utility

// Fetch menu items by type (PIZZA or SODA)
export const createOrderService = async (payload:IOrder): Promise<IOrder> => {
  return await apiCall({
    url: `order-now`, // Endpoint to fetch items by type
    method: 'POST',
    data:payload,
    service: 'order',
  });
};
