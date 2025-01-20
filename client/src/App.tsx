import  { useState, useEffect } from "react";
import MapWithDoctors from "./components/MapWithDoctors";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's location using navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar activePage={"map"} />
      <div className="flex flex-col w-full">
        <Navbar />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : userLocation ? (
          <MapWithDoctors coordinates={userLocation} />
        ) : (
          <p>No location available</p>
        )}
      </div>
    </div>
  );
};

export default App;
