import Link from "next/link";

const SelectView: React.FC = () => {
  return (
    <div className="pb-4 p-4 rounded bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center justify-center text-center">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12">
        Choose Your <span className="text-blue-500">View</span>
      </h1>

      {/* Options for Admin or User */}
      <div className="flex space-x-10">
        {/* User View */}
        <Link href="/user-view/menu">
          <div className="bg-blue-500 text-white px-16 py-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl cursor-pointer">
            <h2 className="text-3xl font-bold">User View</h2>
            <p className="mt-4 text-lg">Browse the menu and place orders</p>
          </div>
        </Link>

        {/* Admin View */}
        <Link href="/admin">
          <div className="bg-green-500 text-white px-16 py-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl cursor-pointer">
            <h2 className="text-3xl font-bold">Admin View</h2>
            <p className="mt-4 text-lg">Manage orders and track progress</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectView;
