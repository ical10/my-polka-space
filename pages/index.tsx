import { useEffect } from "react";
import Head from "next/head";
import Layout from "src/components/Layout";
import { Button } from "flowbite-react";
import { useSubSocialApiHook } from "src/hooks/use-subsocial-api";

export default function Home() {
  const { initApi, getAllPosts, posts } = useSubSocialApiHook();

  const myAddress = "3soMmYkxaHgZmfe1DBH4LbekKGj2JMxEWowkiWiCwGk3ugto";

  useEffect(() => {
    initApi();
  }, []);

  const handleGetAllPosts = () => {
    getAllPosts(myAddress);
  };

  return (
    <div>
      <Head>
        <title>My Web3 Space</title>
        <meta name="description" content="My space in web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>This is my space</div>
        <Button onClick={handleGetAllPosts}>Get Posts</Button>
      </Layout>
    </div>
  );
}
