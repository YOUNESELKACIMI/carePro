import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useContext";
import userServices from "../services/user";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Saved = () => {
  const { token } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userServices.getMyProfile(token);
      setUserDetails(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex">
      <Sidebar activePage={"saved"} />
      <div className="w-full">
        <Navbar />
        <div className="p-10">
          <h1 className="text-4xl my-10">Saved doctors</h1>  
          <div>
            {userDetails &&
              userDetails.doctors.map((doctor) => (
                <div
                  key={doctor.place_id}
                  className="flex bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  <div className="w-1/4">
                    <img
                      src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                      alt="Doctor"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <div className="w-3/4 ml-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600">{doctor.locality}</p>
                  </div>
                </div>
              ))}
            {userDetails && userDetails.doctors.length === 0 && (
              <p className="text-gray-600">You have no saved doctors.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
