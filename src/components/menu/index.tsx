"use client";

import { useState } from "react";

const MenuDetails: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'pizza' | 'soda'>('pizza'); // Initial tab selected
  const [cart, setCart] = useState<{ [key: string]: number }>({
    Margherita: 0,
    Pepperoni: 0,
    Coke: 0,
    Sprite: 0,
  });

  interface IMenuItem {
    name: string;
    price: number;
  }

  // Define the type for the menuItems object
  type MenuItems = {
    pizza: IMenuItem[];
    soda: IMenuItem[];
  };

  const menuItems: MenuItems = {
    pizza: [
      { name: "Margherita", price: 12 },
      { name: "Pepperoni", price: 15 },
    ],
    soda: [
      { name: "Coke", price: 3 },
      { name: "Sprite", price: 3 },
    ],
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 flex flex-col md:flex-row">
      {/* Left side: Advertising Text */}
      <div className="w-full md:w-2/3 p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
          Welcome to <span className="text-blue-500">PizzaFusion</span>!
        </h1>
        <p className="text-md md:text-lg text-gray-700 mb-6">
          At PizzaFusion, we believe in serving only the finest, freshest ingredients. Every pizza is crafted from scratch using the best locally sourced produce, and our sodas are carefully curated to complement every bite.
        </p>
        <div className="mt-8 space-y-6">
          <div className="bg-white p-4 md:p-6 shadow-xl rounded-lg transition-all hover:shadow-2xl">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-500">
              🍕 Made Fresh to Order
            </h2>
            <p className="text-gray-700">
              All of our pizzas are made fresh when you order. From the dough to the toppings, everything is prepared in-house, ensuring you get a pizza that's hot, fresh, and full of flavor.
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 shadow-xl rounded-lg transition-all hover:shadow-2xl">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-500">
              🥤 Refreshing Sodas
            </h2>
            <p className="text-gray-700">
              Our sodas are carefully selected to offer a perfect match with our pizzas. Choose from a variety of classic and refreshing drinks to complete your meal.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Vertical Tabs and Menu */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow-lg">
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

        {/* Menu Items */}
        <div className="space-y-6">
          {menuItems[selectedTab].map((item: IMenuItem, index: number) => (
            <div
              key={item.name}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div>
                <h2 className="text-md md:text-xl font-bold text-gray-800">{item.name}</h2>
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
                <span className="text-md md:text-lg font-semibold">{cart[item.name]}</span>
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

        {/* Add to Cart Button */}
        <div className="mt-10">
          <button
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105"
            onClick={() => alert("Items added to cart")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
