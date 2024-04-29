import axios from "axios";
import { Idata } from "../types/types";

const login = async (data: Idata) => {
  const res = await axios.post("/api/login", data);
  return res.data;
};

const verifyToken = async (token) => {
  console.log(token);
  try {
    const res = await axios.get("/api", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};

const authServices = { login, verifyToken };

export default authServices;
