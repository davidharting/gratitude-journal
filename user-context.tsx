import React, { useEffect } from "react";
import userbase from "userbase-js";

const APP_ID = "c69f9674-005d-4840-9306-3406fd4271ee";

const AuthContext = React.createContext(null);
const UserContext = React.createContext(null);
const UserbaseContext = React.createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    userbase
      .init({ appId: APP_ID })
      .then((session) => {
        if (session.user) {
          setUser(session.user);
        }
      })
      .catch((e) => {
        console.log("Error initializing userbase");
        console.error(e);
      });
  }, []);

  const signUp = async (email, password) => {
    try {
      const newUser = await userbase.signUp({
        username: email,
        email,
        password,
        rememberMe: "local",
      });
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.log("Unable to sign up user");
      console.error(err);
    }
  };

  const signIn = async (email, password) => {
    try {
      const u = userbase.signIn({ username: email, password });
      setUser(u);
      return u;
    } catch (err) {
      console.log("Unable to login");
      console.error(err);
    }
  };

  const signOut = () => {
    userbase.signOut();
    setUser(null);
  };

  const auth = { signIn, signUp, signOut };

  return (
    <UserContext.Provider value={user}>
      <UserbaseContext.Provider value={user ? userbase : null}>
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
      </UserbaseContext.Provider>
    </UserContext.Provider>
  );
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  if (auth === "undefined") {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}

function useUser() {
  const user = React.useContext(UserContext);
  if (user === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}

function useCollection(name) {
  const userbase = React.useContext(UserbaseContext);
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    if (userbase) {
      userbase.openDatabase({
        databaseName: name,
        changeHandler: (items) => {
          setItems(
            items.map((i) => {
              return {
                id: i.itemId,
                ...i.item,
              };
            })
          );
        },
      });
    }
  }, [userbase]);

  if (userbase === undefined) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  if (userbase === null) {
    const notReady = () => {
      throw new Error("Database not initialized");
    };
    return {
      isReady: false,
      items: [],
      add: notReady,
      update: notReady,
      delete: notReady,
    };
  }

  return {
    isReady: true,
    items,
    add: (data) => userbase.insertItem({ databaseName: name, item: data }),
    update: (id, data) =>
      userbase.updateItem({ databaseName: name, itemId: id, item: data }),
    delete: (id) => userbase.deleteItem({ databaseName: name, itemId: id }),
  };
}

export { useAuth, useUser, useCollection, UserProvider };
