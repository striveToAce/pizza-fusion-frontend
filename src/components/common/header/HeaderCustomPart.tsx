import Link from "next/link";
interface HeaderCustomerPartProps {
  totalPriceTillnow: number;
}
export const HeaderCustomerPart: React.FC<HeaderCustomerPartProps> = ({
  totalPriceTillnow,
}) => {
  return (
    <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
      {/* Total Price and Checkout Button */}
      <div className="flex items-center space-x-4">
        <div className="text-gray-700 font-semibold text-lg md:text-xl">
          Total:{" "}
          <span className="text-green-500">
            ${totalPriceTillnow.toFixed(2)}
          </span>
        </div>
        {totalPriceTillnow > 0 && (
          <Link href="/my-cart">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg transform transition-all hover:scale-105 hover:bg-blue-600 cursor-pointer text-sm md:text-base">
              Checkout
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};
