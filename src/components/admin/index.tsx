"use client";
import { getOrdersByStatus } from "@/services/orderService";
import React, { useState, useEffect, useMemo } from "react";
import { OrderStatsCard } from "./OrderStatsCard";
import { TotalPendingTimeDisplay } from "./TotalPendingTimeDisplay";

/**
 * AdminDashboard component
 *
 * This component displays a live dashboard for monitoring orders.
 * It shows pending orders, orders in progress, and completed orders.
 *
 * @returns {JSX.Element} Admin Dashboard component
 */
const AdminDashboard: React.FC = () => {
  type loadingType = -1 | 0 | 1 | 2;
  // Example initial pending orders
  const [pendingOrders, setPendingOrders] = useState<Array<IOrder>>([]);
  const [progressOrders, setProgressOrders] = useState<Array<IOrder>>([]);
  const [doneOrders, setDoneOrders] = useState<Array<IOrder>>([]);
  const [loading, setLoading] = useState<loadingType>(-1);

  const statusKeyMapping = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Done",
  };
  const loadingKeyMapping = {
    PENDING: 0 as loadingType,
    IN_PROGRESS: 1 as loadingType,
    COMPLETED: 2 as loadingType,
  };
  const getAllOrders = async (type: orderStatus) => {
    try {
      setLoading(loadingKeyMapping[type]);
      const data = await getOrdersByStatus(type);
      if (type === "COMPLETED") setDoneOrders(data);
      else if (type === "IN_PROGRESS") setProgressOrders(data);
      else setPendingOrders(data);
    } catch (err) {
    } finally {
      setLoading(-1);
    }
  };

  const callAllOrders = async() => {
    await getAllOrders("PENDING");
    await getAllOrders("IN_PROGRESS");
    await getAllOrders("COMPLETED");
  };
  // Simulate order updates (For demo purposes)
  useEffect(() => {
    callAllOrders();
  }, []);

  const timeTracker = useMemo(() => {
    // Helper function to calculate remaining time
    const calculateRemainingTime = (order: IOrder): string => {
      if (!order.estimatedCompletionTime) return "0 s";

      const now = new Date();
      const completionTime = new Date(order.estimatedCompletionTime);
      const diffMs = completionTime.getTime() - now.getTime();

      if (diffMs <= 0) return "0 s"; // Return 0 if the time has passed

      const diffSeconds = Math.floor(diffMs / 1000); // Total seconds
      const hours = Math.floor(diffSeconds / 3600); // 1 hour = 3600 seconds
      const minutes = Math.floor((diffSeconds % 3600) / 60); // Remaining minutes
      const seconds = diffSeconds % 60; // Remaining seconds

      // Conditionally build the time string without 0 values
      let timeString = "";
      if (hours > 0) timeString += `${hours} hrs `;
      if (minutes > 0) timeString += `${minutes} mins `;
      if (seconds > 0 || timeString === "") timeString += `${seconds} s`;

      return timeString.trim(); // Remove any trailing whitespace
    };

    // Combine all orders into a single array
    const allOrders = [...doneOrders, ...pendingOrders, ...progressOrders];

    const ordersWithRemainingTime = {} as { [key: string]: string };
    // Map orders to an array of objects with id and remaining minutes
    allOrders.map((order) => {
      ordersWithRemainingTime[order.id ?? ""] = calculateRemainingTime(order);
    });

    return ordersWithRemainingTime;
  }, [JSON.stringify({ doneOrders, pendingOrders, progressOrders })]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          🍕 Admin Dashboard
        </h1>

        {/* Dashboard Overview */}
        <TotalPendingTimeDisplay
          timeTracker={timeTracker}
          pendingOrders={pendingOrders}
          isLoading={loading==0}
        />

        {/* Orders by Status */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Pending Orders */}
          <OrderStatsCard
            title={"Pending Orders"}
            noTitle={"No pending orders"}
            list={pendingOrders}
            timeTracker={timeTracker}
            isLoading={loading==0}
          />

          {/* In Progress Orders */}
          <OrderStatsCard
            title={"In Progress Orders"}
            noTitle={"No in-progress orders"}
            list={progressOrders}
            timeTracker={timeTracker}
            isLoading={loading==1}
          />

          {/* Completed Orders */}
          <OrderStatsCard
            title={"Completed Orders"}
            noTitle={"No completed orders"}
            list={doneOrders}
            timeTracker={timeTracker}
            isLoading={loading==2}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
