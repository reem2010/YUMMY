import React, { useState } from "react";
import CategoriesFilter from "../components/CategoriesFilter";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default function Menu({ items, categories, addToCart, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCat, setSelectedCat] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 4;

  function changePage(page) {
    setCurrentPage(page);
  }

  function changeCat(id) {
    setCurrentPage(1);
    setSelectedCat(id);
    setSearchInput("");
  }

  function changeSearchInput(e) {
    let value = e.target.value.trim();
    setSearchInput(value);
    setCurrentPage(1);
  }

  let regex = new RegExp(searchInput, "i");

  let filteredItems = items.filter(
    (item) =>
      (!selectedCat || item.category == selectedCat) && regex.test(item.name)
  );

  let pages = Array.from(
    { length: Math.ceil(filteredItems.length / pageSize) },
    (_, idx) => idx + 1
  );

  const start = (currentPage - 1) * pageSize;
  filteredItems = filteredItems.slice(start, start + 4);

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="grow grid grid-cols-3 container mx-auto gap-10 my-[60px] ">
      {/*  side bar */}
      <CategoriesFilter
        categories={categories}
        changeCat={changeCat}
        selectedCat={selectedCat}
      />
      <div className="col-span-2 flex flex-col gap-8 items-center">
        {/* search */}
        <Search
          searchInput={searchInput}
          changeSearchInput={changeSearchInput}
        />
        {/* table of items */}
        {filteredItems.length > 0 && (
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price} $</td>
                    <td
                      className="cursor-pointer"
                      onClick={() => addToCart(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`size-6 ${
                          item.count ? "fill-[#bb4d00]" : "fill-none"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* messages */}
        {!filteredItems.length && searchInput && (
          <h2 className="grow flex items-center justify-center">
            Sorry, we couldn't find any result
          </h2>
        )}
        {!filteredItems.length && !searchInput && (
          <h2 className="grow flex items-center justify-center">
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
    </div>
  );
}
