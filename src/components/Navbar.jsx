import React from "react";
import { Link } from "react-router";

export default function Navbar({ itemsNumber }) {
  return (
    <div className="shadow-sm">
      <div className="container m-auto navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
          </div>
          <Link
            to="/"
            className=" cursor-pointer text-2xl flex items-center gap-2"
          >
            <img src="/logo.png" alt="" className="w-[40px] rounded-[5px]" />
            <span>YUMMY</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="text-xl" to="/about">
                About
              </Link>
            </li>

            <li>
              <Link className="text-xl" to="/menu">
                Menu
              </Link>
            </li>

            <li>
              <Link className="text-xl" to="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/cart" className="navbar-end relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {itemsNumber > 0 && (
            <span className="absolute -top-[50%] -right-[10px] bg-amber-700 size-[20px] text-white rounded-[10px] flex items-center justify-center text-[12px] p-0.5">
              {itemsNumber}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
