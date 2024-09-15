// lib/axios.ts
import axios, { AxiosRequestConfig, Method } from "axios";

interface ApiRequestProps {
  url: string;
  method?: Method;
  data?: unknown;
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
  } catch (error : unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Call Error:", error.message);
  
      // Check if there's a response from the API with a message
      const errorMessage = error.response?.data?.message || "Error with the API request";
      throw new Error(errorMessage);
  
    } else if (error instanceof Error) {
      // Handle general JavaScript errors
      console.error("General Error:", error.message);
      throw new Error(error.message);
      
    } else {
      // Handle unknown errors
      console.error("Unknown Error:", error);
      throw new Error("An unknown error occurred");
    }
  }
};

export default apiCall;
