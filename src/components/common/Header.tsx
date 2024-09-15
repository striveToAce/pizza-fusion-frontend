"use client";
import { RootState } from "@/redux/store";
import { setCurrentView } from "@/redux/viewSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface HeaderProps {
  totalPrice: number;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ totalPrice, isAdmin }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentView, carts } = useSelector((store: RootState) => store.view);
  const isCustomer = currentView === "customer";

  const totalPriceTillnow = useMemo(() => {
    let currentTotal = 0;
    carts.map((c) => {
      currentTotal += c.qnty * c.item.price;
    });
    return currentTotal;
  }, [JSON.stringify(carts)]);

  const addCurrentView = (value: currentViewType) => {
    dispatch(setCurrentView(value));
  };
  useEffect(() => {
    if (currentView === null) {
      const key = localStorage.getItem("pf-view") as currentViewType;
      if (key === "admin" || key === "customer") addCurrentView(key);
      else addCurrentView("customer");
    }
  }, [currentView]);

  return (
    <header className="bg-white shadow-md border-b border-gray-200 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6">
        {/* Logo Section */}
        <div className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
          <Link href="/">
            <div className="hover:text-blue-500 transition-colors cursor-pointer">
              🍕 PizzaFusion
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        {isCustomer && (
          <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Total Price and Checkout Button */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 font-semibold text-lg md:text-xl">
                Total:{" "}
                <span className="text-green-500">
                  ${totalPriceTillnow.toFixed(2)}
                </span>
              </div>
              {totalPriceTillnow > 0 && (
                <Link href="/my-cart">
                  <div className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg transform transition-all hover:scale-105 hover:bg-blue-600 cursor-pointer text-sm md:text-base">
                    Checkout
                  </div>
                </Link>
              )}
            </div>
          </nav>
        )}

        {/* Change View Section */}
        <div className="mt-4 md:mt-0">
          <Link href="/select-view">
            <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full shadow-md transform transition-all hover:bg-gray-200 hover:scale-105 cursor-pointer text-sm md:text-base">
              Change View
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
