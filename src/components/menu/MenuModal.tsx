"use client";
import toast from "react-hot-toast";
import { addMenuItem, updateMenuItem } from "@/services/menuService";
import { useState } from "react";
import { IMenuItem, IMenuItemPayload } from "@/types/menu";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: IMenuItem | null;
  closeModal: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  currentItem,
  closeModal,
}) => {
  const [name, setName] = useState(currentItem?.name || "");
  const [description, setDescription] = useState(
    currentItem?.description || ""
  );
  const [price, setPrice] = useState(currentItem?.price || 0);
  const [type, setType] = useState<"PIZZA" | "SODA">(
    currentItem?.type || "PIZZA"
  );
  const [size, setSize] = useState<"SMALL" | "MEDIUM" | "LARGE">(
    currentItem?.size || "SMALL"
  );

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Validate form inputs
  const validateForm = (): boolean => {
    let formIsValid = true;
    const newErrors = { name: "", description: "", price: "" };

    if (name.length > 100) {
      newErrors.name = "Name cannot be more than 100 characters.";
      formIsValid = false;
    }

    if (description.length > 300) {
      newErrors.description = "Description cannot be more than 300 characters.";
      formIsValid = false;
    }

    if (price <= 0) {
      newErrors.price = "Price must be a positive number.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const updatedItem: IMenuItemPayload = {
        name,
        description,
        price,
        type,
        size,
      };
      if (currentItem?.id) updatedItem.id = currentItem.id;

      if (updatedItem.id) {
        toast.loading("Updating...");
        await updateMenuItem(updatedItem.id, updatedItem);
        toast.dismiss();
        toast.success("Menu item updated successfully!");
      } else {
        toast.loading("Adding new menu item...");
        await addMenuItem(updatedItem);
        toast.dismiss();
        toast.success("Menu item added successfully!");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong.");
    } finally {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {currentItem ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Name</label>
          <input
            type="text"
            className={`w-full border p-2 rounded-lg ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            className={`w-full border p-2 rounded-lg ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            className={`w-full border p-2 rounded-lg ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Type</label>
          <select
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value as "PIZZA" | "SODA")}
          >
            <option value="PIZZA">Pizza</option>
            <option value="SODA">Soda</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Category</label>
          <select
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={size}
            onChange={(e) =>
              setSize(e.target.value as "MEDIUM" | "SMALL" | "LARGE")
            }
          >
            <option value="LARGE">Large</option>
            <option value="MEDIUM">Medium</option>
            <option value="SMALL">Small</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {currentItem ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
