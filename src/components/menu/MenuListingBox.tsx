import React from "react";

interface MenuListingBoxProps {
  isLoading: boolean;
  items: IMenuItem[];
  handleQuantityChange: (item: IMenuItem, change: number) => void;
  idQtyStore: { [key: string]: number };
  type: "pizza" | "soda";
}
export const MenuListingBox: React.FC<MenuListingBoxProps> = ({
  isLoading,
  items,
  handleQuantityChange,
  idQtyStore,
  type,
}) => {
  const sizeDisplayConversion = {
    SMALL: "S",
    MEDIUM: "M",
    LARGE: "L",
  };

  return (
    <div className="w-full md:w-1/2 mt-8 md:mt-0">
      {type === "pizza" && (
        <h2 className="text-2xl font-bold mb-4 text-blue-500">🍕 Pizza</h2>
      )}
      {type === "soda" && (
        <h2 className="text-2xl font-bold mb-4 text-blue-500">🥤 Soda</h2>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6 overflow-y-auto max-h-[400px] p-2 rounded-lg">
          {items.map((item: IMenuItem, index: number) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div>
                <h2 className="text-md md:text-xl font-bold text-gray-800">
                  {`${item.name} - (${sizeDisplayConversion[item.size]})`}
                </h2>
                <p className="text-blue-500 font-semibold text-md md:text-lg">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
                <button
                  className="bg-gray-300 px-2 md:px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                  onClick={() => handleQuantityChange(item, -1)}
                >
                  −
                </button>
                <span className="text-md md:text-lg font-semibold">
                  {idQtyStore[item.id] || 0}
                </span>
                <button
                  className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="p-2 text-gray-600">no soda found currently</div>
          )}
        </div>
      )}
    </div>
  );
};
