"use client";
import { useState } from "react";

const MenuDetails: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("pizza"); // Initial tab selected
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
  const menuItems = {
    pizza: [
      { name: "Margherita", price: 12 },
      { name: "Pepperoni", price: 15 },
    ],
    soda: [
      { name: "Coke", price: 3 },
      { name: "Sprite", price: 3 },
    ],
  };

  // Handle increment/decrement of item quantity
  const handleQuantityChange = (itemName: string, change: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: Math.max(0, (prevCart[itemName] || 0) + change), // Ensure no negative quantity
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left side: Advertising Text */}
      <div className="w-2/3 p-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to PizzaFusion!</h1>
        <p className="text-lg text-gray-700 mb-6">
          At PizzaFusion, we believe in serving only the finest, freshest
          ingredients. Every pizza is crafted from scratch using the best
          locally sourced produce, and our sodas are carefully curated to
          complement every bite.
        </p>
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              🍕 Made Fresh to Order
            </h2>
            <p className="text-gray-700">
              All of our pizzas are made fresh when you order. From the dough to
              the toppings, everything is prepared in-house, ensuring you get a
              pizza that's hot, fresh, and full of flavor.
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              🥤 Refreshing Sodas
            </h2>
            <p className="text-gray-700">
              Our sodas are carefully selected to offer a perfect match with our
              pizzas. Choose from a variety of classic and refreshing drinks to
              complete your meal.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Vertical Tabs and Menu */}
      <div className="w-1/3 bg-white p-6 shadow-lg">
        {/* Vertical Tabs */}
        <div className="flex flex-col space-y-4 mb-8">
          <button
            onClick={() => setSelectedTab("pizza")}
            className={`text-lg font-semibold py-2 px-4 rounded-lg ${
              selectedTab === "pizza"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pizza
          </button>
          <button
            onClick={() => setSelectedTab("soda")}
            className={`text-lg font-semibold py-2 px-4 rounded-lg ${
              selectedTab === "soda"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Soda
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {menuItems[selectedTab].map((item: IMenuItem, index: number) => (
            <div key={item.name} className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-gray-300 px-3 py-1 rounded-lg"
                  onClick={() => handleQuantityChange(item.name, -1)}
                >
                  −
                </button>
                <span className="text-lg font-semibold">{cart[item.name]}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg"
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
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
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
