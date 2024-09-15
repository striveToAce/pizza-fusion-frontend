"use client";
import { setCurrentView } from "@/redux/viewSlice";
import { useDispatch } from "react-redux";
import { IndividualViewCard } from "./IndividualViewCard";

/**
 * A component that displays a selection between user view and admin view.
 * It renders two {@link IndividualViewCard} components with different links and
 * descriptions.
 */
const SelectView: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center justify-center text-center p-4 md:p-10">
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
          /**
           * The label description for the user view card.
           */
          labelDesc="Browse the menu and place orders"
          /**
           * The function to call when the user view card is clicked.
           * It sets the current view to "user" and navigates to the user view page.
           */
          setCurrentView={(value) => {
            dispatch(setCurrentView(value));
          }}
          /**
           * The link to navigate to when the user view card is clicked.
           */
          link={"/user-view/menu"}
        />
        {/* Admin View */}

        <IndividualViewCard
          color="red"
          label="Admin View"
          /**
           * The label description for the admin view card.
           */
          labelDesc="Manage orders and track progress"
          /**
           * The function to call when the admin view card is clicked.
           * It sets the current view to "admin" and navigates to the admin view page.
           */
          setCurrentView={(value) => {
            dispatch(setCurrentView(value));
          }}
          /**
           * The link to navigate to when the admin view card is clicked.
           */
          link={"/select-view/admin"}
        />
      </div>
    </div>
  );
};

export default SelectView;
