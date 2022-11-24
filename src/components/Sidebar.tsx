import React from "react";
import Link from "next/link";
import Emoji from "src/components/Emoji";
import ActiveLink from "src/components/ActiveLink";

type SidebarProps = {
  children?: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div>
      <div className="p-2 flex flex-row">
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <ActiveLink href="/">
                <Emoji symbol="🌐" />
                My Public Space
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/customize">
                <Emoji symbol="🛠️" />
                Card Customization
              </ActiveLink>
            </li>
          </ul>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
