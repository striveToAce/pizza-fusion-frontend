"use client";
import { getMenuItemsByType } from "@/services/menuService";
import React, { useEffect, useState } from "react";

export const MenuPageRightSide: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"pizza" | "soda">("pizza");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [menuItems, setMenuItems] = useState<IMenuItems>({
    pizza: [],
    soda: [],
  });
  const [cart, setCart] = useState<{ [key: string]: number }>({
    Margherita: 0,
    Pepperoni: 0,
    Coke: 0,
    Sprite: 0,
  });

  /**
   * Handles increment/decrement of item quantity in the cart.
   *
   * @param itemName The name of the item to update in the cart.
   * @param change The amount to increase or decrease the quantity of the item by.
   */
  const handleQuantityChange = (itemName: string, change: number): void => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: Math.max(
        0,
        (prevCart[itemName] || 0) + change // Ensure no negative quantity
      ),
    }));
  };

  const getAllPizza = async () => {
    try {
      setIsLoading(true);
      const pizzaData = await getMenuItemsByType("pizza");
      setMenuItems((prev) => ({ ...prev, pizza: pizzaData }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getAllSoda = async () => {
    try {
      setIsLoading(true);
      const sodaData = await getMenuItemsByType("soda");
      setMenuItems((prev) => ({ ...prev, soda: sodaData }));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  /**/
  useEffect(() => {
    if (selectedTab === "pizza") getAllPizza();
    else getAllSoda();
  }, [selectedTab]);

  const sizeDispalyConversion = {
    SMALL: "S",
    MEDIUM: "M",
    LARGE: "L",
  };
  return (
    <div className="w-full md:w-2/4 bg-white p-6 shadow-lg">
      {/* Vertical Tabs */}
      <div className="flex justify-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 mb-8">
        <button
          onClick={() => setSelectedTab("pizza")}
          className={`text-md md:text-lg font-semibold py-2 px-4 rounded-lg ${
            selectedTab === "pizza"
              ? "bg-blue-500 text-white transform transition-transform duration-300 hover:scale-105"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pizza
        </button>
        <button
          onClick={() => setSelectedTab("soda")}
          className={`text-md md:text-lg font-semibold py-2 px-4 rounded-lg ${
            selectedTab === "soda"
              ? "bg-blue-500 text-white transform transition-transform duration-300 hover:scale-105"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Soda
        </button>
      </div>

      <div className="flex flex-col h-full">
        {/* Scrollable Menu Items */}
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-full space-x-4">
              <div className="loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-6 overflow-y-auto max-h-[500px] p-2 rounded-lg">
              {menuItems[selectedTab].map((item: IMenuItem, index: number) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
                >
                  <div>
                    <h2 className="text-md md:text-xl font-bold text-gray-800">
                      {`${item.name} - (${sizeDispalyConversion[item.size]})`}
                    </h2>
                    <p className="text-blue-500 font-semibold text-md md:text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
                    <button
                      className="bg-gray-300 px-2 md:px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                      onClick={() => handleQuantityChange(item.name, -1)}
                    >
                      −
                    </button>
                    <span className="text-md md:text-lg font-semibold">
                      {cart[item.name]}
                    </span>
                    <button
                      className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={() => handleQuantityChange(item.name, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart Button (Always Visible) */}
        {!isLoading && (
          <div className="mt-4">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all">
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
