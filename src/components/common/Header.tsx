import Link from "next/link";

interface HeaderProps {
  totalPrice: number;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ totalPrice, isAdmin }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 py-3">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <div className="text-2xl font-semibold text-gray-900">
          <Link href="/">
            <div className="hover:text-blue-500 transition-colors">
              🍕 PizzaFusion
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          {/* Total Price and Checkout Button */}
          <div className="flex items-center space-x-4">
            <div className="text-gray-700 font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <Link href="/checkout">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition-all cursor-pointer">
                Checkout
              </div>
            </Link>
          </div>

          {/* Conditional Admin Link */}
          {isAdmin && (
            <Link href="/admin">
              <div className="text-gray-700 hover:text-blue-500 transition-colors">
                Order Progress
              </div>
            </Link>
          )}
        </nav>

        {/* Admin/Login Section */}
        <div>
          <Link href="/select-view">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              Change view
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
