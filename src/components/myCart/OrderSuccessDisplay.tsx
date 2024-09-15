"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const OrderSuccessDisplay: React.FC = () => {
  const { latestOrder } = useSelector((store: RootState) => store.view);
  const router = useRouter();

  // Handler for navigating back to the home page
  const goToHomePage = () => {
    router.push("/");
  };
  if (latestOrder === null) {
    goToHomePage();
  }
  // Assuming the order ID is passed via query parameters or you can fetch it from the backend
  const orderId = latestOrder?.id;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      {/* Success message container */}
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        {/* Checkmark icon for success */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success message */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Order Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your order. Your order ID is{" "}
          <span className="font-bold text-blue-600">{orderId}</span>. Please
          keep this for future reference.
        </p>

        {/* Button to go to the home page */}
        <button
          onClick={goToHomePage}
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition transform hover:scale-105"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
