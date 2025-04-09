import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

export default function Admin({ items, categories, deleteItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const pageSize = 4;

  function changePage(page) {
    setCurrentPage(page);
  }

  function changeSearchInput(e) {
    let value = e.target.value.trim();
    setSearchInput(value);
    setCurrentPage(1);
  }

  async function handleDelete(itemId) {
    const id = toast.loading("deleting your item");
    try {
      await axios.delete(`http://localhost:3000/items/${itemId}`);

      deleteItem(itemId);
      if (items.length - 1 == (currentPage - 1) * pageSize) {
        setCurrentPage(currentPage - 1);
      }
      toast.update(id, {
        render: "Item Deleted succesfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(id, {
        render: "An error occured will deleting the item",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error.message);
    }
  }

  let regex = new RegExp(RegExp.escape(searchInput), "i");
  let filteredItems = items.filter(
    (item) =>
      regex.test(item.name) ||
      regex.test(categories.find((cat) => cat.id == item.category).name)
  );

  let pages = Array.from(
    { length: Math.ceil(filteredItems.length / pageSize) },
    (_, idx) => idx + 1
  );

  const start = (currentPage - 1) * pageSize;
  filteredItems = filteredItems.slice(start, start + 4);
  return (
    <div className="flex flex-col gap-8 items-center w-[1000px] mx-auto  justify-center py-[60px] grow">
      {/* controls */}
      <div className="flex items-center justify-between w-full ">
        <button className="btn" onClick={() => navigate("/admin/new-product")}>
          Add
        </button>
        <Search
          searchInput={searchInput}
          changeSearchInput={changeSearchInput}
        />
      </div>

      {/* table of items */}
      {filteredItems.length > 0 && (
        <div className="overflow-x-auto w-full">
          <table className="table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} $</td>
                  <td>
                    {categories.find((cat) => cat.id == item.category).name}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/admin/edit-product", { state: item })
                    }
                  >
                    <FiEdit size={20} />
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteOutline size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* messages */}
      {!filteredItems.length && searchInput && (
        <h2 className="my-[90px] flex items-center justify-center">
          Sorry, we couldn't find any result
        </h2>
      )}
      {!filteredItems.length && !searchInput && (
        <h2 className="my-[90px] flex items-center justify-center">
          No items yet
        </h2>
      )}

      {/* pagination */}
      {pages.length > 1 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          changePage={changePage}
        />
      )}
    </div>
  );
}
