import React, { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "src/components/Sidebar";

const Navbar = dynamic(() => import("src/components/Navbar"), {
  ssr: false,
});

const SelectAccountModal = dynamic(
  () => import("src/components/SelectAccountModal"),
  {
    ssr: false,
  }
);

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Navbar onOpenSelectAccount={toggleModal} />

      <Sidebar>{children}</Sidebar>

      <SelectAccountModal isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

export default Layout;
