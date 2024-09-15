import Link from "next/link";
export const HeaderLogo: React.FC = () => {
  return (
    <div className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
      <Link href="/">
        <div className="hover:text-blue-500 transition-colors cursor-pointer">
          🍕 PizzaFusion
        </div>
      </Link>
    </div>
  );
};
