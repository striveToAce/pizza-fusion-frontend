import { Spinner } from "../common/loader/Spinner";

/**
 * A component that displays the total number of pending orders and
 * the estimated total time required to complete them.
 *
 * @param {IOrder[]} pendingOrders - An array of IOrder objects
 * @param {boolean} isLoading - A boolean indicating whether the component
 * is currently loading
 * @returns {JSX.Element} A JSX element containing the total pending
 * orders and estimated completion time
 */
export const TotalPendingTimeDisplay: React.FC<{
  pendingOrders: IOrder[];
  isLoading: boolean;
}> = ({pendingOrders, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6 space-y-4 md:space-y-0">
      {isLoading ? (
        // Display a spinner if the component is still loading
        <Spinner />
      ) : (
        <>
          <div className="text-gray-700 text-lg md:text-xl font-semibold text-center">
            // Display the total number of pending orders
            Total Pending Orders:{" "}
            <span className="text-green-500 text-2xl md:text-3xl">
              {pendingOrders.length}
            </span>
          </div>
          <div className="text-gray-700 text-lg md:text-xl font-semibold text-center">
            // Display the estimated total time required to complete
            // all the pending orders
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
