import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useAuth, useUser } from "../user-context";

function AppLayout({ children }) {
  const auth = useAuth();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <ul>
          {user && (
            <li>
              <button onClick={auth.signOut}>Sign Out</button>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/sign-up">
                <a>Sign Up</a>
              </Link>
            </li>
          )}
        </ul>
      </header>
      <main>{children}</main>
    </>
  );
}
export default AppLayout;
