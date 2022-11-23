import Head from "next/head";
import Layout from "src/components/Layout";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const Customize = () => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <div>
      <Head>
        <title>My Web3 Space - Customize</title>
        <meta name="description" content="My space in web3 - Customize Menu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col gap-8">
          <div className="border-2 border-black">
            <div className="card rounded-none card-side bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/200/280/arch" alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Watch</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-red-500">
            <div className="card rounded-2xl card-side bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/200/280/arch" alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Watch</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Customize;
