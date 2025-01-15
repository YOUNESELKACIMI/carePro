import { useState } from "react";
import React from "react";
import useAuth from "./useContext";

export const useLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    try {
      await login({ email, password });
    } catch (error) {
      setErr((error as any)?.response?.data.error);
    }
  };

  return { handleLogin, email, setEmail, password, setPassword, err };
};