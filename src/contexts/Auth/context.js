import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
  error: null,
  signUp: async function () {},
  logIn: async function () {},
  logOut: async function () {},
  signInWithGoogle: async function () {},
});
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};