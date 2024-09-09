import React, { useState } from "react";
import { CategoriesProps } from "../types";

const Category: React.FC<CategoriesProps> = ({ categories, addCategory }) => {
  const [inputCategory, setInputCategory] = useState<string>("");

  const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!categories.some((category) => category.name === inputCategory)) {
      addCategory(inputCategory);
      setInputCategory("");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-green-600 mb-2">Category</h3>
      <input
        type="text"
        value={inputCategory}
        onChange={(e) => setInputCategory(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={(e) => handleAddCategory(e)}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Create category
      </button>
    </div>
  );
};

export default Category;
