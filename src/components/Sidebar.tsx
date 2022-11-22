import React from "react";
import Link from "next/link";
import Emoji from "src/components/Emoji";

type SidebarProps = {
  children?: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div>
      <main className="p-2 flex flex-row max-w-[1024px]">
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link
                href="/"
                className="text-lg font-regular text-secondary focus:font-semibold"
              >
                <Emoji symbol="🌐" />
                My Public Space
              </Link>
            </li>
            <li>
              <Link
                href="/customize"
                className="text-lg font-regular text-secondary focus:font-semibold"
              >
                <Emoji symbol="🛠️" />
                Customization
              </Link>
            </li>
          </ul>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
