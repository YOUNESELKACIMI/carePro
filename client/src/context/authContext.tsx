import { createContext, useEffect, useState } from "react";
import authServices from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { IcurrentUser, Idata, Iparam } from "../types/types";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext<Iparam>({} as Iparam);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IcurrentUser | string | null>(
    "loading"
  );
  const [token, setToken] = useState<string | null>(null);

  const login = async (data: Idata): Promise<void> => {
    const res = await authServices.login(data);
    localStorage.setItem("access_token", JSON.stringify(res.token));
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: res.email,
        name: res.name,
      })
    );
    const decoded: IcurrentUser = jwtDecode(res.token);
    setCurrentUser(decoded);
    setToken(res.token);
    return;
  };
  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    let tokenExtracted: string | null = null;
    try {
      tokenExtracted = JSON.parse(localStorage.getItem("access_token") ?? "");
    } catch (error) {
      setCurrentUser(null);
      setToken(null);
    }

    const asyncFunction = async () => {
      if (tokenExtracted) {
        const ok: number = await authServices.verifyToken(tokenExtracted);
        if (ok) {
          const decoded: IcurrentUser = jwtDecode(tokenExtracted);
          setCurrentUser(decoded);
          setToken(tokenExtracted);
        } else {
          setCurrentUser(null);
          setToken(null);
        }
      } else {
        setCurrentUser(null);
        setToken(null);
      }
    };

    asyncFunction();
  }, []);

  return (
    <AuthContext.Provider value={{ token, currentUser, login, logout }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
