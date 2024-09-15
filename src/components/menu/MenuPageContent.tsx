"use client";
import { RootState } from "@/redux/store";
import { addItemToCart } from "@/redux/viewSlice";
import { getMenuItemsByType } from "@/services/menuService";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MenuListingBox } from "./MenuListingBox";

export const MenuPageContent: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<IMenuItems>({
    pizza: [],
    soda: [],
  });
  const { carts } = useSelector((store: RootState) => store.view);

  const idQtyStore = useMemo(() => {
    const toBeReturned = {} as { [key: string]: number };
    carts.map((c) => {
      toBeReturned[c.item.id] = c.qnty;
    });
    return toBeReturned;
  }, [JSON.stringify(carts)]);

  // Fetch Pizza data
  const getAllPizza = async () => {
    try {
      setIsLoading(true);
      const pizzaData = await getMenuItemsByType("pizza");
      setMenuItems((prev) => ({ ...prev, pizza: pizzaData }));
    } catch (err) {
      console.error("Error fetching pizza items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Soda data
  const getAllSoda = async () => {
    try {
      setIsLoading(true);
      const sodaData = await getMenuItemsByType("soda");
      setMenuItems((prev) => ({ ...prev, soda: sodaData }));
    } catch (err) {
      console.error("Error fetching soda items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch both Pizza and Soda data when the component mounts
    getAllPizza();
    getAllSoda();
  }, []);

  // Handle quantity changes in the cart
  const handleQuantityChange = (item: IMenuItem, change: number): void => {
    if (change !== -1) dispatch(addItemToCart({ item, qnty: 1 }));
    else dispatch(addItemToCart({ item, qnty: -1 }));
  };

  return (
    <div className="w-full bg-white p-6 shadow-lg">
      {/* Display Text for User Interaction */}
      <div className="text-center text-gray-600 mb-6">
        <p className="text-md md:text-lg">
          Select your favorite items from the Pizza and Soda menu below and
          adjust the quantity. Add your choices to the cart when you're ready!
        </p>
      </div>

      {/* Pizza and Soda sections displayed together */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Pizza Section */}
        <MenuListingBox
          type="pizza"
          idQtyStore={idQtyStore}
          handleQuantityChange={handleQuantityChange}
          isLoading={isLoading}
          items={menuItems.pizza}
        />

        {/* Soda Section */}
        <MenuListingBox
          idQtyStore={idQtyStore}
          type="soda"
          handleQuantityChange={handleQuantityChange}
          isLoading={isLoading}
          items={menuItems.soda}
        />
      </div>
    </div>
  );
};
