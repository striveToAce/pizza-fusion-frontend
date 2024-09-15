import { Spinner } from "../common/loader/Spinner";

export const TotalPendingTimeDisplay: React.FC<{
  pendingOrders: IOrder[];
  timeTracker: { [id: string]: string };
  isLoading: boolean;
}> = ({ timeTracker, pendingOrders, isLoading }) => {
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
                ? (() => {
                    const totalTime = pendingOrders.reduce(
                      (acc, order) => {
                        const remainingTime = timeTracker[order.id ?? ""];
                        if (!remainingTime) return acc;

                        // Split the time into parts, dynamically parse the hours, minutes, and seconds
                        const timeParts = remainingTime.split(" ");
                        let hours = 0,
                          minutes = 0,
                          seconds = 0;

                        // Parse the time string from dynamic "X hrs Y mins Z s" format
                        for (let i = 0; i < timeParts.length; i += 2) {
                          const value = parseInt(timeParts[i], 10); // Get the number
                          const unit = timeParts[i + 1]; // Get the unit (hrs, mins, s)

                          if (unit === "hrs") {
                            hours = value;
                          } else if (unit === "mins") {
                            minutes = value;
                          } else if (unit === "s") {
                            seconds = value;
                          }
                        }

                        // Add hours, minutes, and seconds to the accumulator
                        acc.hours += hours;
                        acc.minutes += minutes;
                        acc.seconds += seconds;

                        return acc;
                      },
                      { hours: 0, minutes: 0, seconds: 0 } // Initial accumulator value
                    );

                    // Convert seconds to minutes if >= 60
                    if (totalTime.seconds >= 60) {
                      totalTime.minutes += Math.floor(totalTime.seconds / 60);
                      totalTime.seconds = totalTime.seconds % 60;
                    }

                    // Convert minutes to hours if >= 60
                    if (totalTime.minutes >= 60) {
                      totalTime.hours += Math.floor(totalTime.minutes / 60);
                      totalTime.minutes = totalTime.minutes % 60;
                    }

                    // Conditionally format the total time string without 0 values
                    let timeString = "";
                    if (totalTime.hours > 0)
                      timeString += `${totalTime.hours} hrs `;
                    if (totalTime.minutes > 0)
                      timeString += `${totalTime.minutes} mins `;
                    if (totalTime.seconds > 0 || timeString === "")
                      timeString += `${totalTime.seconds} s`;

                    return timeString.trim(); // Return the final time string
                  })()
                : "N/A"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
