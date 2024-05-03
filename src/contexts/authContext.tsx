import { ReactNode, createContext } from "react";
export const AuthContext = createContext({});

type Props = {
  children: ReactNode;
}

const AuthProvider = ({ children }:Props) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;