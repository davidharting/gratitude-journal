import React from "react";
import Head from "next/head";
import Layout from "../layouts/App";

import { useUser, useCollection } from "../user-context";

function Home() {
  const user = useUser();
  const dogs = useCollection("dogs");
  const [dogName, setDogName] = React.useState("");

  const addDog = (e) => {
    e.preventDefault();
    dogs.add({ name: dogName });
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to the 30 day gratitude journal</h1>
      <p>Hello, {user && user.username}!</p>
      <form onSubmit={addDog}>
        <label htmlFor="dogName">Your new dog's name</label>
        <br />
        <input
          type="text"
          name="dogName"
          onChange={(e) => setDogName(e.target.value)}
        />
        <br />
        <input type="submit" disabled={!dogName} />
      </form>
      <ul>
        {dogs.items.map((i) => {
          return <li>{i.name}</li>;
        })}
      </ul>
    </Layout>
  );
}

export default Home;
