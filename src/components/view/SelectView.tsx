import Link from "next/link";

const SelectView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center justify-center text-center p-4 md:p-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 md:mb-12">
        Choose Your <span className="text-blue-500">View</span>
      </h1>

      {/* Options for Admin or User */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
        {/* User View */}
        <Link href="/user-view/menu">
          <div className="bg-blue-500 text-white px-10 py-6 md:px-16 md:py-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl cursor-pointer">
            <h2 className="text-2xl md:text-3xl font-bold">User View</h2>
            <p className="mt-4 text-md md:text-lg">
              Browse the menu and place orders
            </p>
          </div>
        </Link>

        {/* Admin View */}
        <Link href="/select-view/admin">
          <div className="bg-green-500 text-white px-10 py-6 md:px-16 md:py-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl cursor-pointer">
            <h2 className="text-2xl md:text-3xl font-bold">Admin View</h2>
            <p className="mt-4 text-md md:text-lg">
              Manage orders and track progress
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectView;
