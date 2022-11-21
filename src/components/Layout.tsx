import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="#">
          <span className="self-center whitespace-nowrap text-xl font-bold text-pink-500 dark:text-white">
            My Web3 Space
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link href="/" passHref>
            <span className="text-md font-semibold text-pink-500 dark:text-white">
              My Space
            </span>
          </Link>
          <Link href="/about" passHref>
            <span className="text-md font-semibold text-pink-500 dark:text-white">
              My Profile
            </span>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
