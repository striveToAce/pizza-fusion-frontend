import React from "react";

export const MenuPageLeftSide: React.FC = () => {
  return (
    <div className="w-full md:w-3/4 p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
        Welcome to <span className="text-blue-500">PizzaFusion</span>!
      </h1>
      <p className="text-md md:text-lg text-gray-700 mb-6">
        At PizzaFusion, we believe in serving only the finest, freshest
        ingredients. Every pizza is crafted from scratch using the best locally
        sourced produce, and our sodas are carefully curated to complement every
        bite.
      </p>
      <div className="mt-8 space-y-6">
        <div className="bg-white p-4 md:p-6 shadow-xl rounded-lg transition-all hover:shadow-2xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-500">
            🍕 Made Fresh to Order
          </h2>
          <p className="text-gray-700">
            All of our pizzas are made fresh when you order. From the dough to
            the toppings, everything is prepared in-house, ensuring you get a
            pizza that's hot, fresh, and full of flavor.
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 shadow-xl rounded-lg transition-all hover:shadow-2xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-500">
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
  );
};
