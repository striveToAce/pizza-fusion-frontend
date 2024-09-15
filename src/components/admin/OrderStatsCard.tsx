"use client";
import { useRouter } from "next/navigation";
import { PageLoader } from "../common/loader/PageLoader";

interface OrderStatsCardProps {
  list: IOrder[];
  title: string;
  noTitle: string;
  isLoading: boolean;
  color: string;
}
/**
 * Component to display order stats.
 *
 * @param title - The title of the section
 * @param noTitle - The text to display if there are no orders
 * @param list - The list of orders to display
 * @param isLoading - Whether the component should display a loading animation
 * @param color - The color of the component
 */
export const OrderStatsCard: React.FC<OrderStatsCardProps> = ({
  title,
  noTitle,
  list,
  isLoading,
  color,
}) => {
  const router = useRouter();
  const statusToNormal: { [key: string]: string } = {
    PENDING: "Pending",
    IN_PROGRESS: "Preparing",
    COMPLETED: "Done",
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex-1 cursor-pointer">
      {/* Title */}
      <h2 className={`text-xl md:text-2xl font-bold mb-4 text-${color}-500`}>
        {title}
      </h2>

      {/* Loading Animation */}
      {isLoading && <PageLoader />}

      {/* List of orders */}
      <div className="space-y-4">
        {list.length > 0 ? (
          list.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center bg-gray-50 p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              {/* Details */}
              <div
                onClick={() => {
                  // Navigate to the order detail page
                  router.push(`/my-cart/order-detail/${order.id}`);
                }}
              >
                <h3 className="text-md md:text-lg font-semibold">
                  Order #{order.id}
                </h3>
                {color !== "green" && (
                  <p className="text-sm text-gray-600">
                    Preparation Time: {order.estimatedCompletionTime}
                  </p>
                )}
              </div>

              {/* Status */}
              <div
                className={`w-full md:w-auto flex justify-center items-center px-3 py-2 md:px-4 md:py-2 bg-${color}-500 text-white rounded-full font-semibold text-sm md:text-base text-center`}
              >
                {statusToNormal[order.status ?? ""]}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{noTitle}</p>
        )}
      </div>
    </div>
  );
};
