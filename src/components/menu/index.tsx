"use client";

import { useState } from "react";
import { MenuPageContent } from "./MenuPageContent";
import { MenuPageLeftSide } from "./MenuPageLeftSide";

const MenuDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 flex flex-col md:flex-row">
      <MenuPageContent />
    </div>
  );
};

export default MenuDetails;
