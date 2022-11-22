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
          <div className="text-xl font-semibold">
            Customize your Post card here
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Customize;
