'use client'
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface WrapperProps {
  children: React.ReactNode;
  cartItems?: number;
  isAdmin?: boolean;
}

const LayoutWrapper: React.FC<WrapperProps> = ({
  children,
  cartItems,
  isAdmin,
}) => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        {/* Header */}
        <Header totalPrice={0} isAdmin={isAdmin ?? false} />

        {/* Main Content */}
        <main className="container mx-auto p-6 flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </Provider>
  );
};

export default LayoutWrapper;
