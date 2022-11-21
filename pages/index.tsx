import { useEffect } from "react";
import Head from "next/head";
import Layout from "src/components/Layout";
import { Button, Card } from "flowbite-react";
import { useSubSocialApiHook } from "src/hooks/use-subsocial-api";

export default function Home() {
  const { initApi, getAllPosts, getAllPostsBySpaceId, posts, spaces } =
    useSubSocialApiHook();

  const myAddress = "5DSg6JpKCjKVSEEKzVtoSkszpMu3NUfWEs7WiDcCxzhXksCV";

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
            <div key={post.id} className="max-w-md p-5">
              <Card imgSrc={post.content?.link ? post.content?.link[0] : ""}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.content?.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {post.content?.body}
                </p>
              </Card>
            </div>
          ))
        )}
        <Button onClick={handleGetAllPosts}>Get Posts</Button>
      </Layout>
    </div>
  );
}
