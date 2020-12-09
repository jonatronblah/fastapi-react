import React, { useContext, createContext } from "react";

import './style.css';

import useProvideAuth from "../LoggedIn"

export const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
  }

export function useAuth() {
    return useContext(authContext);
  }
  


