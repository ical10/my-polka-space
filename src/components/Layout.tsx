import React from "react";
import dynamic from "next/dynamic";
import Sidebar from "src/components/Sidebar";

const Navbar = dynamic(() => import("src/components/Navbar"), {
  ssr: false,
});

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />

      <Sidebar>{children}</Sidebar>
    </>
  );
};

export default Layout;
