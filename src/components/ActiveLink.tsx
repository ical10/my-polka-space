import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter();
  const classes = `${
    href === router.pathname ? "font-bold bg-gray-300" : "font-regular"
  } text-lg text-secondary focus:font-semibold`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={classes}>
      {children}
    </Link>
  );
}
