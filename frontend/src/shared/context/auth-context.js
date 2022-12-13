import { createContext } from "react";

const initialState = { isLoggedIn: false, login: () => {}, logout: () => {} };

export const AuthContext = createContext(initialState);

createContext();
