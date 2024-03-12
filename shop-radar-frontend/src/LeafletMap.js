import React, { useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LeafletMap = () => {
  const [userLocation, setUserLocation] = useState([47.9136048, -122.1991969]);

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
    alert(`You clicked on the map at latitude ${lat} and longitude ${lng}`);
    // Handle the clicked location as needed.
  };

  const handleLocationFound = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
    console.log("User location:", userLocation); // Add this line
    alert(`Your current location is at latitude ${lat} and longitude ${lng}`);
    // You can also update the state or perform other actions with the user's location.
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          //setUserLocation((prevLocation) => [latitude, longitude]);

          alert(
            `Your current location is at latitude ${latitude} and longitude ${longitude}`
          );
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  };

  return (
    <div>
      <button onClick={getUserLocation}>Get My Location</button>
      <MapContainer
        center={[47.9136048, -122.1991969]}
        zoom={13}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={userLocation} icon={defaultIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        <ClickHandler
          handleClick={handleClick}
          handleLocationFound={handleLocationFound}
        />
      </MapContainer>
    </div>
  );
};

const ClickHandler = ({ handleClick, handleLocationFound }) => {
  useMapEvents({
    click: (e) => {
      handleClick(e);
    },
    locationfound: (e) => {
      handleLocationFound(e);
    },
  });

  return null;
};

export default LeafletMap;
