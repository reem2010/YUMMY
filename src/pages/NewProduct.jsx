import React from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function NewProduct({ categories, addItem }) {
  const navigate = useNavigate();

  async function handleSubmit(inputData) {
    const id = toast.loading("Adding your item");
    try {
      const newItem = { ...inputData, count: 0 };
      const { data } = await axios.post("http://localhost:3000/items", newItem);
      addItem(data);
      navigate("/admin");
      toast.update(id, {
        render: `${newItem.name} added successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(id, {
        render: "An error occured will adding the item",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error.message);
    }
  }

  return (
    <div className="container m-auto py-[30px]">
      <h1 className="text-center text-3xl mb-10">Add new product</h1>
      <ProductForm
        categories={categories.slice(1)}
        submitHandler={handleSubmit}
      />
    </div>
  );
}
