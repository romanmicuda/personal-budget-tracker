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
    <div>
      <h3>Category</h3>
      <input
        type="text"
        value={inputCategory}
        onChange={(e) => setInputCategory(e.target.value)}
      />
      <button onClick={(e) => handleAddCategory(e)}>Create category</button>
    </div>
  );
};

export default Category;
