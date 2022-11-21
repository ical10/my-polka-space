import { useEffect } from "react";
import { themeChange } from "theme-change";
import Head from "next/head";
import PostCard from "src/components/PostCard";
import Layout from "src/components/Layout";
import { useSubSocialApiHook } from "src/hooks/use-subsocial-api";

export default function Home() {
  const { initApi, getAllPosts, getAllPostsBySpaceId, posts, spaces } =
    useSubSocialApiHook();

  const myAddress = "5DSg6JpKCjKVSEEKzVtoSkszpMu3NUfWEs7WiDcCxzhXksCV";

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  useEffect(() => {
    initApi();
  }, []);

  const handleGetAllPosts = () => {
    getAllPosts(myAddress);
  };

  const handleGetAllPostsBySpaceId = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const value = event.currentTarget.value;
    getAllPostsBySpaceId(value as string);
  };

  return (
    <div>
      <Head>
        <title>My Web3 Space</title>
        <meta name="description" content="My space in web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>This is my public space</div>
        {spaces &&
          spaces.map((space) => (
            <button
              key={space.id}
              value={space.id}
              onClick={handleGetAllPostsBySpaceId}
            >
              {space.id}
            </button>
          ))}
        <div className="flex flex-col gap-10">
          {!posts || !posts.length ? (
            <div>Your space is empty!</div>
          ) : (
            posts.map((post) => <PostCard post={post} key={post.id} />)
          )}
        </div>
        <button className="btn btn-primary" onClick={handleGetAllPosts}>
          Get Posts
        </button>
      </Layout>
    </div>
  );
}
