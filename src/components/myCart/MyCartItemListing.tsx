interface MyCartItemListingProps {
  carts: ICartItem[];
}
/**
 * @description A component that displays the items in the user's cart.
 *
 * @param {MyCartItemListingProps} props - The props for the component.
 * @param {ICartItem[]} props.carts - The items in the user's cart.
 * @returns {JSX.Element} - The component.
 */
export const MyCartItemListing: React.FC<MyCartItemListingProps> = ({
  carts,
}) => {
  return (
    <div className="space-y-4">
      {carts.map((cartItem, index) => (
        <div
          key={cartItem.item.id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
        >
          <div>
            {/* Display the name, price and description of the item */}
            <h3 className="text-md md:text-xl font-bold text-gray-800">
              {`${cartItem.item.name} - (${cartItem.item.size})`}
            </h3>
            <p className="text-blue-500 font-semibold text-md md:text-lg">
              ${cartItem.item.price.toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm">{cartItem.item.description}</p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 bg-white p-2 rounded-lg shadow">
            {/* Display the quantity of the item */}
            <span className="text-md md:text-lg font-semibold">
              Quantity: {cartItem.qnty}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
