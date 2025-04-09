import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.required(),
});

export default function ProductForm({
  name,
  price,
  category,
  submitHandler,
  categories,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || "",
      category: category || (categories[0] && categories[0].id),
      price: price || "",
    },
    shouldUseNativeValidation: false,
    resolver: joiResolver(schema),
    mode: "onChange",
  });
  return (
    <form
      className="flex flex-col gap-8 items-center w-[400px] m-auto"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name">Enter product name</label>
        <input
          id="name"
          className="input w-full focus-within:outline-0"
          {...register("name")}
        />
        {errors.name && <span className="text-xs">{errors.name.message}</span>}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="price">Enter product price</label>
        <input
          id="price"
          className="input w-full focus-within:outline-0"
          {...register("price")}
        />
        {errors.price && (
          <span className="text-xs">{errors.price.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="cat">Select product category</label>
        <select
          id="cat"
          defaultValue="Medium"
          className="select select-md w-full focus-within:outline-0"
          {...register("category")}
        >
          {categories.map((cat) => (
            <option
              key={cat.id}
              className={category == cat.id ? "selected" : ""}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-xs">{errors.category.message}</span>
        )}
      </div>

      <input className="btn w-[200px]" type="submit" value="Submit" />
    </form>
  );
}
