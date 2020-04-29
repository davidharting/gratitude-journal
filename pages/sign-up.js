import React from "react";
import Router from "next/router";
import { useAuth } from "../user-context";

// Would be fun to try out xstate for this simple form!
// States like: invalid, valid, submitting? s

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    await auth.signUp(email, password);
    Router.push("/");
  };

  const isValid = () => {
    const hasEmail = !!email;
    const hasPassword = !!password;
    return hasEmail && hasPassword && email.includes("@");
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form name="sign-up" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" disabled={!isValid()} />
      </form>
    </>
  );
}

export default SignUp;
