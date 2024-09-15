import React from "react";

export const ManageItemList: React.FC<{
  list: IMenuItem[];
  handleEdit: (item:IMenuItem) => void;
  handleDelete: (id:string,type:'pizza' | 'soda') => void;
}> = ({ list,handleDelete,handleEdit }) => {
  return (
    <div className="space-y-4">
      {list.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
        >
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">{item.description}</p>
            <p className="text-blue-500 font-bold">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
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
