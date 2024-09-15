"use client";
import { useEffect, useMemo, useState } from "react";
import { PageLoader } from "../common/loader/PageLoader";
import { getOrderDetailById } from "@/services/orderService";

export const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
  const [order, setOrder] = useState<IOrder | null>(null);

  const getOrderDetails = async () => {
    try {
      const data = await getOrderDetailById(id);
      setOrder(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (id) getOrderDetails();
  }, [id]);

  const totalPriceTillnow = useMemo(() => {
    if (!order) return 0;
    let currentTotal = 0;
    (order?.items ?? []).map((c) => {
      currentTotal += c.quantity * (c.menuItem?.price || 0);
    });
    return currentTotal;
  }, [JSON.stringify(order ?? {})]);

  return (
    <div>
      {Boolean(order) ? (
        <>
          {/* List of Cart Items */}
          <div className="space-y-4">
            {(order?.items ?? []).map((cartItem, index) => (
              <div
                key={cartItem.menuItemId}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="text-md md:text-xl font-bold text-gray-800">
                    {`${cartItem.menuItem?.name} - (${cartItem.menuItem?.size})`}
                  </h3>
                  <p className="text-blue-500 font-semibold text-md md:text-lg">
                    ${(cartItem.menuItem?.price || 0).toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {cartItem.menuItem?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
                  <span className="text-md md:text-lg font-semibold">
                    Quantity: {cartItem.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-6 flex justify-between items-center text-xl font-semibold">
            <span>Total Price:</span>
            <span className="text-blue-500">
              ${totalPriceTillnow.toFixed(2)}
            </span>
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};
