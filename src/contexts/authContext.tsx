import { ReactNode, createContext, useState } from "react";
import { authService } from "@services/auth";
import { AuthBody, User } from "../types/user";
export const AuthContext = createContext({});

type Props = {
  children: ReactNode;
}

const AuthProvider = ({ children }:Props) => {
  //State donde se guardan los datos del usuario (email y name)
  const [user, setUser] = useState<User | null>(null);
  //State donde se almacena el token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  //Función encargada de iniciar sesión
  const login = async (body:AuthBody, callback?: ()=> void) => {
    try {
      const res = await authService.login(body)
      
      //Si existe el token:
      if (res.token) {
        //Se guardan los datos del usuario
        setUser({
          email: res.email,
          name: res.name,
        });
        //Se guarda el token en el state y en el local storage
        setToken(res.token);
        localStorage.setItem("token", res.token);
      }

      //Si existe el callback se ejecutará
      callback && callback()
    } catch (err) {
      console.error(err);
    } 
  };

  //Función encargada de cerrar sesión
  const logOut = (callback?: ()=> void) => {
    //Limpieza de usuario y token
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    //Si existe el callback se ejecutará
    callback && callback()
  };

  return <AuthContext.Provider value={{ token, user, login, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;