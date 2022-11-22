import Head from "next/head";
import Layout from "src/components/Layout";

const Customize = () => {
  return (
    <div>
      <Head>
        <title>My Web3 Space</title>
        <meta name="description" content="My space in web3" />
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
