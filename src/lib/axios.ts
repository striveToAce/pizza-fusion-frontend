// lib/axios.ts
import axios, { AxiosRequestConfig, Method } from "axios";

interface ApiRequestProps {
  url: string;
  method?: Method;
  data?: any;
  headers?: Record<string, string>;
  service?: "menu" | "order" | "chef"; // Choose which microservice to call
}

// Create an Axios instance with default settings
const apiCall = async ({
  url,
  method = "GET",
  data,
  headers = {},
  service = "menu", // Default to 'menu' service
}: ApiRequestProps) => {
  const baseUrl =
    service === "menu"
      ? process.env.NEXT_PUBLIC_MENU_SERVICE_URL
      : service === "chef"
      ? process.env.NEXT_PUBLIC_CHEF_SERVICE_URL
      : process.env.NEXT_PUBLIC_ORDER_SERVICE_URL;

  const fullUrl = `${baseUrl}${url}`;

  const config: AxiosRequestConfig = {
    method,
    url: fullUrl,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error("API Call Error:", error.message);
    throw new Error(
      error.response?.data?.message || "Error with the API request"
    );
  }
};

export default apiCall;
