import { useEffect } from "react";
import { themeChange } from "theme-change";
import Head from "next/head";
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
        <div>This is my space</div>
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
        {!posts || !posts.length ? (
          <div>Your space is empty!</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.content?.title}</h2>
                <p>{post.content?.body}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Upvote</button>
                </div>
              </div>
            </div>
          ))
        )}
        <button className="btn btn-primary" onClick={handleGetAllPosts}>
          Get Posts
        </button>
      </Layout>
    </div>
  );
}
