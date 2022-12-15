import { createContext } from "react";

const initialState = { isLoggedIn: false, login: () => {}, logout: () => {}, userID: null };

export const AuthContext = createContext(initialState);

createContext();
