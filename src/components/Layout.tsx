import React from "react";
import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";

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
