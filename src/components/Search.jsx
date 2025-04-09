import React from "react";

export default function Search({ searchInput, changeSearchInput }) {
  return (
    <label className="input focus-within:outline-0 self-end">
      <input
        name="search"
        type="search"
        required
        placeholder="Search"
        value={searchInput}
        onChange={changeSearchInput}
      />
      <button type="submit" className="cursor-pointer">
        <svg
          className="h-[1em] opacity-50 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </button>
    </label>
  );
}
