"use client";
import { setCurrentView } from "@/redux/viewSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { IndividualViewCard } from "./IndividualViewCard";

const SelectView: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className=" bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center justify-center text-center p-4 md:p-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 md:mb-12">
        Choose Your <span className="text-blue-500">View</span>
      </h1>

      {/* Options for Admin or User */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
        {/* User View */}
        <IndividualViewCard
          color="blue"
          label="User View"
          labelDesc="Browse the menu and place orders"
          setCurrentView={(value) => {
            dispatch(setCurrentView(value));
          }}
          link={"/user-view/menu"}
        />
        {/* Admin View */}

        <IndividualViewCard
          color="green"
          label="Admin View"
          labelDesc="Manage orders and track progress"
          setCurrentView={(value) => {
            dispatch(setCurrentView(value));
          }}
          link={"/select-view/admin"}
        />
      </div>
    </div>
  );
};

export default SelectView;
