import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import userServices from "../services/user";
import useAuth from "../hooks/useContext";
const MapWithDoctors = ({ coordinates }) => {
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const {token} = useAuth();

  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE
    }&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && coordinates) {
      // Once map and coordinates are available, perform places search
      searchDoctorsNearby();
    }
  }, [map, coordinates]);

  const initMap = () => {
    const newMap = new window.google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });
    new window.google.maps.Marker({
      position: coordinates,
      map: newMap,
      title: "You are here!",
        });

    newMap.setCenter(coordinates);

    setMap(newMap);
    setPlacesService(new window.google.maps.places.PlacesService(newMap));
  };

  const searchDoctorsNearby = () => {
    if (!placesService) return;

    let request = {
      location: coordinates,
      radius: "500",
      type: ["doctor"],
      keyword: "healthcare",
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(createMarker);
      }
    });

    request = {
      location: coordinates,
      radius: "5000",
      type: ["doctor"],
      keyword: "healthcare",
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(createMarker);
      }
    });
  };

  const createMarker = (place) => {
    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    const infowindow = new window.google.maps.InfoWindow();
    marker.addListener("click", () => {
      console.log(place);
      const content = document.createElement("div");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("mb-2");
      const locationImage = document.createElement("img");
      locationImage.src =
        "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg";
      locationImage.classList.add("w-1/2", "h-auto");
      imageContainer.appendChild(locationImage);
      content.appendChild(imageContainer);

      // Doctor Name
      const nameElement = document.createElement("h2");
      nameElement.textContent = place.name;
      nameElement.classList.add("text-xl", "font-bold", "mb-1");
      content.appendChild(nameElement);

      // Place ID
      const placeIdElement = document.createElement("p");
      placeIdElement.textContent = "Place ID: " + place.place_id;
      placeIdElement.classList.add("text-gray-600", "mb-1");
      content.appendChild(placeIdElement);

      // Place Address
      const placeAddressElement = document.createElement("p");
      placeAddressElement.textContent = place.vicinity;
      placeAddressElement.classList.add("text-gray-600", "mb-1");
      content.appendChild(placeAddressElement);

      // Add Doctor Button
      const addButton = document.createElement("button");
      addButton.textContent = "Add doctor";
      addButton.classList.add(
        "bg-blue-500",
        "hover:bg-blue-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        "mt-4"
      );
      addButton.addEventListener("click", async () => {
        try {
          const doctor = {
            name: place.name,
            place_id: place.place_id,
            locality: place.vicinity,
          };
          const res = await userServices.addDoctor(doctor, token);
          console.log(res);
          toast.success("Doctor added successfully");
        } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred while adding the doctor");
        }
      });
      content.appendChild(addButton);

      infowindow.setContent(content);
      infowindow.open(map, marker);

      console.log({});
    });
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default MapWithDoctors;
