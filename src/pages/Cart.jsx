import React from "react";
import CartItem from "../components/CartItem";

export default function Cart({
  items,
  handleDecrement,
  handleIncrement,
  handleDelete,
  handleClear,
  itemsNumber,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <section
      className="
 flex flex-col items-center justify-center gap-6  w-[1000px] mx-auto grow py-[30px]"
    >
      {itemsNumber > 0 && (
        <div className="overflow-x-auto w-full">
          <h2 className="text-2xl font-semibold text-center">
            You have {itemsNumber} items in your cart
          </h2>
          <table className="table mt-[100px] mb-[60px]">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Totale price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
          <button
            className="cursor-pointer rounded-[10px] px-1.5 hover:bg-gray-500 hover:text-white m-auto block"
            onClick={handleClear}
          >
            Clear cart
          </button>
        </div>
      )}
      {itemsNumber == 0 && <h2 className="text-3xl">Your cart is empty!</h2>}
    </section>
  );
}
