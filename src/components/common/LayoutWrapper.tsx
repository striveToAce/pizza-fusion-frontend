"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface WrapperProps {
  children: React.ReactNode;
  cartItems?: number;
  isAdmin?: boolean;
}

/**
 * A component that wraps the given children with the main layout of the site.
 * This includes the header, footer, and main content area.
 *
 * @param props The props for the component.
 * @param props.children The children of the component.
 * @param props.isAdmin Whether the user is an admin. Defaults to false.
 * @returns The component.
 */
const LayoutWrapper: React.FC<WrapperProps> = ({
  children,
  isAdmin = false,
}) => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* The header of the page */}
        <Header totalPrice={0} isAdmin={isAdmin} />

        {/* The main content area */}
        <main className="container mx-auto p-6 flex-grow">
          {/* Render the children here */}
          {children}
        </main>

        {/* The toaster for notifications */}
        <Toaster />

        {/* The footer of the page */}
        <Footer />
      </div>
    </Provider>
  );
};

export default LayoutWrapper;
