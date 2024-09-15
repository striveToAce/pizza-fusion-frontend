"use client";
import { useRouter } from "next/navigation";
import { PageLoader } from "../common/loader/PageLoader";

interface OrderStatsCardProps {
  list: IOrder[];
  title: string;
  noTitle: string;
  isLoading: boolean;
  color:string
}
export const OrderStatsCard: React.FC<OrderStatsCardProps> = ({
  title,
  noTitle,
  list,
  isLoading,
  color
}) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex-1 cursor-pointer">
      <h2 className={`text-xl md:text-2xl font-bold mb-4 text-${color}-500`}>
        {title}
      </h2>
      {isLoading && <PageLoader />}
      <div className="space-y-4">
        {list.length > 0 ? (
          list.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center bg-gray-50 p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div
                onClick={() => {
                  router.push(`/my-cart/order-detail/${order.id}`);
                }}
              >
                <h3 className="text-md md:text-lg font-semibold">
                  Order #{order.id}
                </h3>
                {color!=="green" && <p className="text-sm text-gray-600">
                  Preparation Time: {order.estimatedCompletionTime}
                </p>}
              </div>
              <div className={`w-full md:w-auto flex justify-center items-center px-3 py-2 md:px-4 md:py-2 bg-${color}-500 text-white rounded-full font-semibold text-sm md:text-base text-center`}>
                {order.status}
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
