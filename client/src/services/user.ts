import axios from "axios";

const addDoctor = async (doctor, token) => {
  const res = await axios.post("/api/doctors/", doctor,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
  });
  return res.data;
};

const userServices = { addDoctor };

export default userServices;
