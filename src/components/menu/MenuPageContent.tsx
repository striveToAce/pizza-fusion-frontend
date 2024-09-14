"use client";
import { RootState } from "@/redux/store";
import { addItemToCart } from "@/redux/viewSlice";
import { getMenuItemsByType } from "@/services/menuService";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const MenuPageContent: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<IMenuItems>({
    pizza: [],
    soda: [],
  });
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const { currentView, carts } = useSelector((store: RootState) => store.view);

  const idQtyStore = useMemo(() => {
    const toBeReturned = {} as { [key: string]: number };
    carts.map((c) => {
      toBeReturned[c.item.id] = c.qnty;
    });
    return toBeReturned;
  }, [JSON.stringify(carts)]);


  // Fetch Pizza data
  const getAllPizza = async () => {
    try {
      setIsLoading(true);
      const pizzaData = await getMenuItemsByType("pizza");
      setMenuItems((prev) => ({ ...prev, pizza: pizzaData }));
    } catch (err) {
      console.error("Error fetching pizza items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Soda data
  const getAllSoda = async () => {
    try {
      setIsLoading(true);
      const sodaData = await getMenuItemsByType("soda");
      setMenuItems((prev) => ({ ...prev, soda: sodaData }));
    } catch (err) {
      console.error("Error fetching soda items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch both Pizza and Soda data when the component mounts
    getAllPizza();
    getAllSoda();
  }, []);

  // Handle quantity changes in the cart
  const handleQuantityChange = (item: IMenuItem, change: number): void => {
    if (change !== -1) dispatch(addItemToCart({ item, qnty: 1 }));
    else dispatch(addItemToCart({ item, qnty: -1 }));
  };

  const sizeDisplayConversion = {
    SMALL: "S",
    MEDIUM: "M",
    LARGE: "L",
  };

  return (
    <div className="w-full bg-white p-6 shadow-lg">
      {/* Display Text for User Interaction */}
      <div className="text-center text-gray-600 mb-6">
        <p className="text-md md:text-lg">
          Select your favorite items from the Pizza and Soda menu below and
          adjust the quantity. Add your choices to the cart when you're ready!
        </p>
      </div>

      {/* Pizza and Soda sections displayed together */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Pizza Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">🍕 Pizza</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-6 overflow-y-auto max-h-[400px] p-2 rounded-lg">
              {menuItems.pizza.map((item: IMenuItem, index: number) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
                >
                  <div>
                    <h2 className="text-md md:text-xl font-bold text-gray-800">
                      {`${item.name} - (${sizeDisplayConversion[item.size]})`}
                    </h2>
                    <p className="text-blue-500 font-semibold text-md md:text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
                    <button
                      className="bg-gray-300 px-2 md:px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                      onClick={() => handleQuantityChange(item, -1)}
                    >
                      −
                    </button>
                    <span className="text-md md:text-lg font-semibold">
                    {idQtyStore[item.id] || 0}
                    </span>
                    <button
                      className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={() => handleQuantityChange(item, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Soda Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">🥤 Soda</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-6 overflow-y-auto max-h-[400px] p-2 rounded-lg">
              {menuItems.soda.map((item: IMenuItem, index: number) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
                >
                  <div>
                    <h2 className="text-md md:text-xl font-bold text-gray-800">
                      {`${item.name} - (${sizeDisplayConversion[item.size]})`}
                    </h2>
                    <p className="text-blue-500 font-semibold text-md md:text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
                    <button
                      className="bg-gray-300 px-2 md:px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                      onClick={() => handleQuantityChange(item, -1)}
                    >
                      −
                    </button>
                    <span className="text-md md:text-lg font-semibold">
                      {idQtyStore[item.id] || 0}
                    </span>
                    <button
                      className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={() => handleQuantityChange(item, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
