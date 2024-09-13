import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Welcome Text */}
      <h1 className="text-5xl font-extrabold text-gray-800">
        Welcome to <span className="text-blue-500">PizzaFusion</span>
      </h1>
      <p className="text-lg text-gray-700">
        Choose your view and get started!
      </p>

      {/* Select View Button */}
      <Link
        href="/select-view"
        className="mt-4 inline-block bg-blue-500 text-white px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl"
      >
        Select Your View
      </Link>     
    </div>
  );
};

export default Home;
