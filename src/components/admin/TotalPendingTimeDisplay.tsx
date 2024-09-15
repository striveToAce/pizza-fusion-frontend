import { Spinner } from "../common/loader/Spinner";

export const TotalPendingTimeDisplay: React.FC<{
  pendingOrders: IOrder[];
  isLoading: boolean;
}> = ({pendingOrders, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6 space-y-4 md:space-y-0">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="text-gray-700 text-lg md:text-xl font-semibold text-center">
            Total Pending Orders:{" "}
            <span className="text-green-500 text-2xl md:text-3xl">
              {pendingOrders.length}
            </span>
          </div>
          <div className="text-gray-700 text-lg md:text-xl font-semibold text-center">
            Estimated Completion Time:{" "}
            <span className="text-blue-500">
              {pendingOrders.length > 0
                ? pendingOrders.reduce((acc,curr)=>acc+(curr?.estimatedCompletionTime??0),0)
                : "N/A"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
