import { useEffect } from "react";
import { themeChange } from "theme-change";
import Head from "next/head";
import PostCard from "src/components/PostCard";
import Layout from "src/components/Layout";
import { useSubSocialApiHook } from "src/hooks/use-subsocial-api";

export default function Home() {
  const { initApi, getAllPostsBySpaceId, posts, publicSpaces } =
    useSubSocialApiHook();

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  useEffect(() => {
    initApi();
  }, []);

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
        <div className="ml-96 max-w-[1024px]">
          <div className="flex flex-col gap-8">
            <div className="font-bold text-lg">Your public space</div>
            <ul className="menu menu-horizontal bg-base-100 border border-primary rounded-box p-2">
              {publicSpaces &&
                publicSpaces.map((space) => (
                  <li key={space.id}>
                    <button
                      value={space.id}
                      onClick={handleGetAllPostsBySpaceId}
                    >
                      {space.content?.name}
                    </button>
                  </li>
                ))}
            </ul>
            <div className="flex flex-col gap-10">
              {!posts || !posts.length ? (
                <div>Your space is empty!</div>
              ) : (
                posts.map((post) => <PostCard post={post} key={post.id} />)
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
