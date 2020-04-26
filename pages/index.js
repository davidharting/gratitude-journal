import Head from "next/head";
import Layout from "../layouts/App";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to the 30 day gratitude journal</h1>
    </Layout>
  );
}
