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


export const getOrdersByStatus = async (query:orderStatus): Promise<IOrder[]> => {
  return await apiCall({
    url: `get-orders?status=${query}`, // Endpoint to fetch items by type
    method: 'GET',
    service: 'order',
  });
};


export const getOrderDetailById = async (id:string): Promise<IOrder> => {
  return await apiCall({
    url: `order-detail/${id}`, // Endpoint to fetch items by type
    method: 'GET',
    service: 'order',
  });
};
