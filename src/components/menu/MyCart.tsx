"use client";
import { RootState } from "@/redux/store";
import { clearCart, clearLatestOrder, setLatestOrder } from "@/redux/viewSlice";
import { createOrderService, getEstimationTime } from "@/services/orderService";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Spinner } from "../common/loader/Spinner";
import { useRouter } from "next/navigation";

export const MyCart: React.FC = () => {
  // Initial list of items already added to the cart
  const { carts } = useSelector((store: RootState) => store.view);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Calculate the total price of the cart
  const totalPrice = carts.reduce(
    (acc: number, cartItem: ICartItem) =>
      acc + cartItem.item.price * cartItem.qnty,
    0
  );

  const orderHandler = async () => {
    setIsLoading(true);
    const {estimatedTime} = await getEstimationTime()
    let pCount = 0;
    let sCount = 0;
    carts.map(
      (c: ICartItem) => {
        if(c.item.type === "PIZZA") pCount+=c.qnty
          else sCount+=c.qnty
      }
    );
    const items = carts.map((c: ICartItem) => ({
      menuItemId: c.item.id,
      quantity: c.qnty,
    }));
    try {
      const data = await createOrderService({
        items,
        totalPrice,
        pizzaCount:pCount,
        sodaCount:sCount,
        estimatedCompletionTime:pCount*5+estimatedTime??0
      });
      dispatch(setLatestOrder(data));
      dispatch(clearCart());
      router.push("/my-cart/order-success");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(clearLatestOrder());
  }, []);

  return (
    <div className="w-full bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Your Order</h2>

      {carts.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* List of Cart Items */}
          <div className="space-y-4">
            {carts.map((cartItem, index) => (
              <div
                key={cartItem.item.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="text-md md:text-xl font-bold text-gray-800">
                    {`${cartItem.item.name} - (${cartItem.item.size})`}
                  </h3>
                  <p className="text-blue-500 font-semibold text-md md:text-lg">
                    ${cartItem.item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {cartItem.item.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
                  <span className="text-md md:text-lg font-semibold">
                    Quantity: {cartItem.qnty}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-6 flex justify-between items-center text-xl font-semibold">
            <span>Total Price:</span>
            <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Order Now Button */}
          <div className="mt-8 flex justify-end">
            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="relative px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                onClick={orderHandler}
              >
                Order Now
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
