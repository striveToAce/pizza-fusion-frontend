"use client";
import { RootState } from "@/redux/store";
import { setCurrentView } from "@/redux/viewSlice";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HeaderCustomerPart } from "./header/HeaderCustomPart";
import { HeaderLogo } from "./header/HeaderLogo";
import { currentViewType } from "@/types/view";

interface HeaderProps {
  totalPrice: number;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch();
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
        <HeaderLogo />

        {/* Navigation Links */}
        {isCustomer && (
          <HeaderCustomerPart totalPriceTillnow={totalPriceTillnow} />
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
