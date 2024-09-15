import React from "react";

/**
 * @description A component that displays a list of items to manage.
 * It shows the name, description, and price of each item.
 * It also provides buttons to edit and delete each item.
 * @param {IMenuItem[]} list - The list of items to display.
 * @param {(item:IMenuItem) => void} handleEdit - A function to call when an item is clicked.
 * @param {(id:string,type:'pizza' | 'soda') => void} handleDelete - A function to call when an item is to be deleted.
 * @returns {JSX.Element} - The list of items.
 */
export const ManageItemList: React.FC<{
  list: IMenuItem[];
  handleEdit: (item:IMenuItem) => void;
  handleDelete: (id:string,type:'pizza' | 'soda') => void;
}> = ({ list, handleDelete, handleEdit }) => {
  return (
    <div className="space-y-4">
      {list.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
        >
          <div>
            {/* Show the name of the item */}
            <h2 className="text-xl font-semibold">{item.name}</h2>
            {/* Show the description of the item */}
            <p className="text-gray-500">{item.description}</p>
            {/* Show the price of the item */}
            <p className="text-blue-500 font-bold">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex space-x-4">
            {/* Edit button */}
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
            {/* Delete button */}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={() => handleDelete(item.id, "soda")}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
