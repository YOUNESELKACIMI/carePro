import axios from "axios";

const getMyProfile = async (token) => {
  const res = await axios.get("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const addDoctor = async (doctor, token) => {
  const res = await axios.post("/api/doctors/", doctor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const userServices = { addDoctor, getMyProfile };

export default userServices;
