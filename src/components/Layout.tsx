import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar
        fluid={true}
        rounded={true}
        className="sticky top-0 z-50 bg-slate-100/20 backdrop-filter backdrop-blur-xl"
      >
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
      <main className="p-2 flex flex-col content-center m-auto items-center max-w-[712px]">
        {children}
      </main>
    </>
  );
};

export default Layout;
