"use client";
import MenuModal from "@/components/menu/MenuModal";
import { deleteMenuItemById, getMenuItemsByType } from "@/services/menuService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ManageItemList } from "./ManageItemList";

export const MenuManagement: React.FC = () => {
  const [isPizzaLoading, setIsPizzaLoading] = useState<boolean>(false);
  const [isSodaLoading, setIsSodaLoading] = useState<boolean>(false);
  const [pizzaItems, setPizzaItems] = useState<IMenuItem[]>([]); // Pizza items
  const [sodaItems, setSodaItems] = useState<IMenuItem[]>([]); // Soda items

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<IMenuItem | null>(null);

  const handleAdd = () => {
    setCurrentItem(null); // No current item means it's an "add" operation
    setIsModalOpen(true);
  };

  const handleEdit = (item: IMenuItem) => {
    setCurrentItem(item); // Set the item to edit
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, type: "pizza" | "soda") => {
    try {
      await deleteMenuItemById(id);
      toast.success("Item deleted successfully");
      getItems()
    } catch (err) {
      toast.error("something went wrong");
    } finally {
    }
  };

  // Fetch Pizza data
  const getAllPizza = async () => {
    try {
      setIsPizzaLoading(true);
      const pizzaData = await getMenuItemsByType("pizza");
      setPizzaItems(pizzaData);
    } catch (err) {
      console.error("Error fetching pizza items:", err);
    } finally {
      setIsPizzaLoading(false);
    }
  };

  // Fetch Soda data
  const getAllSoda = async () => {
    try {
      setIsSodaLoading(true);
      const sodaData = await getMenuItemsByType("soda");
      setSodaItems(sodaData);
    } catch (err) {
      console.error("Error fetching soda items:", err);
    } finally {
      setIsSodaLoading(false);
    }
  };

  const getItems = async () => {
    try {
      await getAllPizza();
      await getAllSoda();
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Menu Management</h1>

      {/* Add Item Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-6 hover:bg-blue-600"
        onClick={handleAdd}
      >
        Add Menu Item
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pizza Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pizza Items</h2>

          {isPizzaLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500"></div>
            </div>
          ) : (
            <ManageItemList
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              list={pizzaItems}
            />
          )}
        </div>

        {/* Soda Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Soda Items</h2>

          {isSodaLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500"></div>
            </div>
          ) : (
            <ManageItemList
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              list={sodaItems}
            />
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <MenuModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentItem={currentItem}
          closeModal={()=>{
            setIsModalOpen(false);
            getItems()
          }}
        />
      )}
    </div>
  );
};
