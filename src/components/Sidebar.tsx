import React from "react";
import Link from "next/link";

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
              <Link href="/">My Public Space</Link>
            </li>
            <li>
              <Link href="/customize">Customization</Link>
            </li>
          </ul>
        </div>
        <div className="ml-96">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
