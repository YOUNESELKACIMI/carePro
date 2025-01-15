import { useState } from "react";
import React from "react";
import authServices from "../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    setErr("");
    try {
      await authServices.register({ name, email, password });
      toast.success("Registration successful, please login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErr("Registration failed, please try again.");
    }
  };

  return {
    handleRegistration,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    err,
  };
};
