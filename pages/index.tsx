import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Navbar } from "flowbite-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Web3 Space</title>
        <meta name="description" content="My space in web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            My Web3 Space
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            My Space
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
