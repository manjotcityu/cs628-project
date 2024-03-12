import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";

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
  };

  const handleLocationFound = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
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
    <div className="map-container">
      <div className="form-container">
        <form>
          <label>Longitude:</label>
          <input type="text" value={userLocation[1]} readOnly />

          <label>Latitude:</label>
          <input type="text" value={userLocation[0]} readOnly />
        </form>
      </div>
      <div className="map">
        <button onClick={getUserLocation}>Get My Location</button>
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
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
