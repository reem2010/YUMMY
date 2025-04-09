import React from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";

export default function EditProduct({ categories, updateItem }) {
  const location = useLocation();
  const item = location.state;

  const navigate = useNavigate();

  async function handleSubmit(data) {
    const id = toast.loading("Updating your item");
    const newItem = { ...item, ...data };
    try {
      await axios.put(`http://localhost:3000/items/${item.id}`, newItem);

      updateItem(newItem);
      navigate("/admin");
      toast.update(id, {
        render: `${newItem.name} updated successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(id, {
        render: "An error occured will Editing the item",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error.message);
    }
  }

  return (
    <div className="container m-auto py-[30px]">
      <h1 className="text-center text-3xl mb-10">Edit your product</h1>
      <ProductForm
        {...item}
        categories={categories.slice(1)}
        submitHandler={handleSubmit}
      />
    </div>
  );
}
