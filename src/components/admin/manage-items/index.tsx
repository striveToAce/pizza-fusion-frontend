"use client";
import MenuModal from "@/components/menu/MenuModal";
import { deleteMenuItemById, getMenuItemsByType } from "@/services/menuService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ManageItemList } from "./ManageItemList";
import { IMenuItem } from "@/types/menu";

export const MenuManagement: React.FC = () => {
  const [isPizzaLoading, setIsPizzaLoading] = useState<boolean>(false);
  const [isSodaLoading, setIsSodaLoading] = useState<boolean>(false);
  const [pizzaItems, setPizzaItems] = useState<IMenuItem[]>([]); // Pizza items
  const [sodaItems, setSodaItems] = useState<IMenuItem[]>([]); // Soda items

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<IMenuItem | null>(null);

  /**
   * Opens the modal with a blank item (i.e. "add" operation).
   */
  const handleAdd = () => {
    // No current item means it's an "add" operation
    setCurrentItem(null);
    // Open the modal
    setIsModalOpen(true);
  };

  const handleEdit = (item: IMenuItem) => {
    setCurrentItem(item); // Set the item to edit
    setIsModalOpen(true);
  };

  /**
   * Deletes a menu item and updates the state
   *
   * @param {string} id - The ID of the item to delete
   * @param {"pizza" | "soda"} type - The type of item to delete (pizza or soda)
   * @returns {Promise<void>}
   */
  const handleDelete = async (id: string): Promise<void> => {
    try {
      // Delete the item
      await deleteMenuItemById(id);
      // Show success message
      toast.success("Item deleted successfully");
      // Fetch items again
      await getItems();
    } catch (err) {
      // Show error message
      toast.error("something went wrong");
    } finally {
      // Do nothing
    }
  };

  /**
   * Fetches all pizza items and updates the state
   *
   * @returns {Promise<void>}
   */
  const getAllPizza = async (): Promise<void> => {
    try {
      // Show loading animation
      setIsPizzaLoading(true);
      // Fetch pizza data
      const pizzaData = await getMenuItemsByType("pizza");
      // Update the state with the new data
      setPizzaItems(pizzaData);
    } catch (err) {
      // Handle errors
      console.error("Error fetching pizza items:", err);
    } finally {
      // Hide loading animation
      setIsPizzaLoading(false);
    }
  };

  /**
   * Fetches all soda items and updates the state
   */
  const getAllSoda = async (): Promise<void> => {
    try {
      // Show loading animation
      setIsSodaLoading(true);
      // Fetch soda data
      const sodaData = await getMenuItemsByType("soda");
      // Update the state with the new data
      setSodaItems(sodaData);
    } catch (err) {
      // Handle errors
      console.error("Error fetching soda items:", err);
    } finally {
      // Hide loading animation
      setIsSodaLoading(false);
    }
  };

  /**
   * Fetches all menu items (pizza and soda) and updates the state
   */
  const getItems = async () => {
    try {
      // Fetch Pizza items
      await getAllPizza();
      // Fetch Soda items
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
          closeModal={() => {
            setIsModalOpen(false);
            getItems();
          }}
        />
      )}
    </div>
  );
};
