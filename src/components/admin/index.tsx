"use client";
import { getOrdersByStatus } from "@/services/orderService";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { OrderStatsCard } from "./OrderStatsCard";
import { TotalPendingTimeDisplay } from "./TotalPendingTimeDisplay";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { IOrder, orderStatus } from "@/types/order";

/**
 * AdminDashboard component
 *
 * This component displays a live dashboard for monitoring orders.
 * It shows pending orders, orders in progress, and completed orders.
 *
 * @returns {JSX.Element} Admin Dashboard component
 */
const AdminDashboard: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();
  type loadingType = -1 | 0 | 1 | 2;
  // Example initial pending orders
  const [pendingOrders, setPendingOrders] = useState<Array<IOrder>>([]);
  const [progressOrders, setProgressOrders] = useState<Array<IOrder>>([]);
  const [doneOrders, setDoneOrders] = useState<Array<IOrder>>([]);
  const [loading, setLoading] = useState<loadingType>(-1);

  const loadingKeyMapping = {
    PENDING: 0 as loadingType,
    IN_PROGRESS: 1 as loadingType,
    COMPLETED: 2 as loadingType,
  };
  /**
   * Fetch all orders of a specific status
   *
   * @param type - The status of the orders to fetch
   * @param isToLoad - Whether to show a loading animation. Defaults to true.
   */
  const getAllOrders = async (type: orderStatus, isToLoad = true) => {
    try {
      // Show loading animation if isToLoad is true
      if (isToLoad) setLoading(loadingKeyMapping[type]);

      // Fetch orders from the server
      const data = await getOrdersByStatus(type);

      // Update the state with the new data
      switch (type) {
        case "COMPLETED":
          setDoneOrders(data);
          break;
        case "IN_PROGRESS":
          setProgressOrders(data);
          break;
        case "PENDING":
          setPendingOrders(data);
          break;
        default:
          throw new Error(`Unknown order status: ${type}`);
      }
    } catch (err) {
      // Handle errors here
    } finally {
      // Hide loading animation
      setLoading(-1);
    }
  };

  /**
   * Fetch all orders of all statuses
   *
   * @param isToLoad - Whether to show a loading animation. Defaults to true.
   */
  const callAllOrders = async (isToLoad: boolean = true) => {
    // Fetch all orders in PENDING status
    await getAllOrders("PENDING", isToLoad);
    // Fetch all orders in IN_PROGRESS status
    await getAllOrders("IN_PROGRESS", isToLoad);
    // Fetch all orders in COMPLETED status
    await getAllOrders("COMPLETED", isToLoad);
  };
  /**
   * Handle real-time updates from Supabase
   *
   * @remarks
   * This function is called when Supabase detects a change in the orders table.
   * It shows a success toast and fetches all orders again.
   */
  const realtimeHandler = (): void => {
    toast.success("found some updates:)");
    // Fetch all orders again without showing a loading animation
    callAllOrders(false);
  };
  // Simulate order updates (For demo purposes)
  useEffect(() => {
    callAllOrders();
  }, []);


  useEffect(() => {
    const changes = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Order",
        },
        () => realtimeHandler()
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          🍕 Admin Dashboard
        </h1>

        <div
          className="flex justify-center my-2"
          onClick={() => {
            router.push("/select-view/admin/manage-items");
          }}
        >
          <div className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer">
            Manage Items (Add/Update/Delete)
          </div>
        </div>

        {/* Dashboard Overview */}
        <TotalPendingTimeDisplay
          pendingOrders={[...pendingOrders, ...progressOrders]}
          isLoading={loading == 0 || loading == 1}
        />

        {/* Orders by Status */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Pending Orders */}
          <OrderStatsCard
            title={"Pending Orders"}
            noTitle={"No pending orders"}
            list={pendingOrders}
            isLoading={loading == 0}
            color="red"
          />

          {/* In Progress Orders */}
          <OrderStatsCard
            title={"In Progress Orders"}
            noTitle={"No in-progress orders"}
            list={progressOrders}
            isLoading={loading == 1}
            color="yellow"
          />

          {/* Completed Orders */}
          <OrderStatsCard
            title={"Completed Orders"}
            noTitle={"No completed orders"}
            list={doneOrders}
            isLoading={loading == 2}
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
