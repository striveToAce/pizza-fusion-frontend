/**
 * Footer component
 *
 * The footer component is a functional component that renders
 * a simple footer with the logo and copyright information.
 *
 * @returns {JSX.Element} Footer component
 */
const Footer: React.FC = () => {
    return (
      <footer className="bg-white shadow-inner border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 md:px-6">
          {/* Footer Content */}
          <div className="flex justify-center items-center mb-4">
            {/* Center Section: Logo */}
            <div className="text-2xl font-semibold text-gray-900 flex items-center">
              {/* Logo */}
              <span className="sr-only">PizzaFusion</span>
              <span aria-hidden="true" className="hover:text-blue-500 transition-colors cursor-pointer">
                🍕 PizzaFusion
              </span>
            </div>
          </div>
          {/* Copyright information */}
          <p className="text-center text-sm md:text-base text-gray-600">
            Copyright &copy; {new Date().getFullYear()} PizzaFusion. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  