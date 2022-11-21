import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-slate-100/20 backdrop-filter backdrop-blur-xl">
        <div className="flex-1">
          <a className="btn btn-ghost text-pink-700 normal-case text-xl">
            My Web3 Space
          </a>
        </div>
        <div className="flex-1">
          <select data-choose-theme>
            <option value="">Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">My Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main className="p-2 flex flex-col content-center m-auto items-center max-w-[712px]">
        {children}
      </main>
    </>
  );
};

export default Layout;
