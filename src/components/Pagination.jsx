import React from "react";

export default function Pagination({ pages, currentPage, changePage }) {
  let visiblePagesNo = 5;
  let start = 0;
  let end = pages.length;

  if (currentPage < visiblePagesNo / 2.0) {
    end = start + 5;
  } else if (currentPage > end - 2) {
    start = end - 5;
  } else {
    start = currentPage - 3;
    end = currentPage + 2;
  }

  return (
    <div className="join">
      {currentPage > 1 && (
        <button
          className="join-item btn"
          onClick={() => changePage(currentPage - 1)}
        >
          «
        </button>
      )}
      {pages.slice(start, end).map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`join-item btn ${page == currentPage && "btn-active"}`}
        >
          {page}
        </button>
      ))}
      {currentPage < pages.length && (
        <button
          className="join-item btn"
          onClick={() => changePage(currentPage + 1)}
        >
          »
        </button>
      )}
    </div>
  );
}
