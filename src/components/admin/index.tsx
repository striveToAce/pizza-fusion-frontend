'use client'
import React, { useState, useEffect } from "react";

/**
 * AdminDashboard component
 *
 * This component displays a live dashboard for monitoring orders.
 * It shows pending orders, orders in progress, and completed orders.
 *
 * @returns {JSX.Element} Admin Dashboard component
 */
const AdminDashboard: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<number>(5); // Example initial pending orders
  const [orders, setOrders] = useState<Array<any>>([
    { id: 1, status: "In Progress", preparationTime: 15 },
    { id: 2, status: "Pending", preparationTime: 20 },
    { id: 3, status: "Pending", preparationTime: 10 },
    { id: 4, status: "Done", preparationTime: 25 },
  ]);

  // Simulate order updates (For demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.status === "Pending"
            ? { ...order, status: "In Progress" }
            : order
        )
      );
    }, 10000); // Every 10 seconds, change status for demo purposes

    return () => clearInterval(interval);
  }, []);

  const getFilteredOrders = (status: string) =>
    orders.filter((order) => order.status === status);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          🍕 Admin Dashboard
        </h1>

        {/* Dashboard Overview */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6 space-y-4 md:space-y-0">
          <div className="text-gray-700 text-lg md:text-xl font-semibold text-center">
            Total Pending Orders:{" "}
            <span className="text-green-500 text-2xl md:text-3xl">
              {getFilteredOrders("Pending").length}
            </span>
          </div>
          <div className="text-gray-700 text-lg md:text-xl font-semibold text-center">
            Estimated Completion Time:{" "}
            <span className="text-blue-500">
              {orders.length > 0
                ? `${orders.reduce((total, order) => total + order.preparationTime, 0) / orders.length} minutes`
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Pending Orders */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-red-500">
              Pending Orders
            </h2>
            <div className="space-y-4">
              {getFilteredOrders("Pending").length > 0 ? (
                getFilteredOrders("Pending").map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center bg-gray-50 p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="text-md md:text-lg font-semibold">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Preparation Time: {order.preparationTime} minutes
                      </p>
                    </div>
                    <div className="px-3 py-2 md:px-4 md:py-2 bg-red-500 text-white rounded-full font-semibold text-sm md:text-base text-center">
                      {order.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pending orders</p>
              )}
            </div>
          </div>

          {/* In Progress Orders */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-500">
              In Progress Orders
            </h2>
            <div className="space-y-4">
              {getFilteredOrders("In Progress").length > 0 ? (
                getFilteredOrders("In Progress").map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center bg-gray-50 p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="text-md md:text-lg font-semibold">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Preparation Time: {order.preparationTime} minutes
                      </p>
                    </div>
                    <div className="w-full md:w-auto flex justify-center items-center px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-white rounded-full font-semibold text-sm md:text-base text-center">
                      {order.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No in-progress orders</p>
              )}
            </div>
          </div>

          {/* Completed Orders */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-500">
              Completed Orders
            </h2>
            <div className="space-y-4">
              {getFilteredOrders("Done").length > 0 ? (
                getFilteredOrders("Done").map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center bg-gray-50 p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="text-md md:text-lg font-semibold">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Preparation Time: {order.preparationTime} minutes
                      </p>
                    </div>
                    <div className="px-3 py-2 md:px-4 md:py-2 bg-green-500 text-white rounded-full font-semibold text-sm md:text-base text-center">
                      {order.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No completed orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
