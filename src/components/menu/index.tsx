"use client";

import { useState } from "react";
import { MenuPageRightSide } from "./MenuPageRightSide";
import { MenuPageLeftSide } from "./MenuPageLeftSide";

const MenuDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 flex flex-col md:flex-row">
      <MenuPageLeftSide />
      <MenuPageRightSide />
    </div>
  );
};

export default MenuDetails;
