"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { clearCart, clearLatestOrder, setLatestOrder } from "@/redux/viewSlice";
import { createOrderService, getEstimationTime } from "@/services/orderService";
import { Spinner } from "../common/loader/Spinner";
import { MyCartItemListing } from "../myCart/MyCartItemListing";

/**
 * The MyCart component displays the user's current cart contents and allows them
 * to place an order.
 */
export const MyCart: React.FC = () => {
  // Get the current cart contents from the Redux store
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

  /**
   * Handler for the "Order Now" button.
   *
   * 1. Estimate the prep time for the order.
   * 2. Create an order object with the items in the cart, the total price, and
   *    the estimated prep time.
   * 3. Call the createOrderService function to create the order.
   * 4. Clear the cart and redirect the user to the order success page.
   */
  const orderHandler = async () => {
    setIsLoading(true);
    toast.loading("estimating prep time from our chef :)");
    const { estimatedTime } = await getEstimationTime();
    let pCount = 0;
    let sCount = 0;
    carts.map((c: ICartItem) => {
      if (c.item.type === "PIZZA") pCount += c.qnty;
      else sCount += c.qnty;
    });
    const items = carts.map((c: ICartItem) => ({
      menuItemId: c.item.id,
      quantity: c.qnty,
    }));
    try {
      toast.dismiss();
      toast.loading("creating order...");
      const data = await createOrderService({
        items,
        totalPrice,
        pizzaCount: pCount,
        sodaCount: sCount,
        estimatedCompletionTime: pCount * 5 + estimatedTime ?? 0,
      });
      toast.dismiss();
      toast(
        `cool! order done:) estimated time ${pCount * 5 + estimatedTime ?? 0}`
      );
      dispatch(setLatestOrder(data));
      dispatch(clearCart());
      router.push("/my-cart/order-success");
    } catch (err) {
      toast.dismiss();
      toast.error("something went wrong:(");
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
          <MyCartItemListing carts={carts} />

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
