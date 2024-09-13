import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 flex flex-col items-center justify-center text-center p-4 md:p-10">
      {/* Welcome Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Welcome to <span className="text-blue-500">PizzaFusion</span>
      </h1>
      <p className="text-md md:text-lg text-gray-700 mb-6">
        Choose your view and get started!
      </p>

      {/* Select View Button */}
      <Link
        href="/select-view"
        className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl"
      >
        Select Your View
      </Link>
    </div>
  );
};

export default Home;
