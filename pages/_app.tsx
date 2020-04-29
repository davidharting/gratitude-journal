import React from "react";
import Link from "next/link";
import userbase from "userbase-js";

import { UserProvider } from "../user-context";

const APP_ID = "c69f9674-005d-4840-9306-3406fd4271ee";

function GratitudeJournalApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default GratitudeJournalApp;
