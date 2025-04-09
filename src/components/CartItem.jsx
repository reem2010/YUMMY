import React from "react";

export default function CartItem(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.price}$</td>
      <td className="flex gap-3.5 items-center">
        <button
          className="cursor-pointer px-2"
          onClick={() => props.handleDecrement(props.id)}
        >
          -
        </button>
        <p className="w-[30px] text-center ">{props.count}</p>
        <button
          className="cursor-pointer px-2"
          onClick={() => props.handleIncrement(props.id)}
        >
          +
        </button>
      </td>
      <td>{props.price * props.count}$</td>
      <td>
        <button
          className="cursor-pointer rounded-[10px] px-1.5 hover:bg-red-700 hover:text-white"
          onClick={() => props.handleDelete(props.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
