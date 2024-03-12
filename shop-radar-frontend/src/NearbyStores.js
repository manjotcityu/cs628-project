// NearbyStores.js
import React, { useState } from "react";
import LeafletMap from "./LeafletMap";
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

function NearbyStores() {
  const [userLocation, setUserLocation] = useState([47.9136048, -122.1991969]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [nearbyStores, setNearbyStores] = useState([]);

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
    setLatitude(lat);
    setLongitude(lng);
    console.log(latitude);
  };

  const handleLocationFound = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation([lat, lng]);
    console.log("User location:", userLocation);
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(longitude);
      const response = await fetch(
        `http://localhost:3002/stores/nearby?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await response.json();
      setNearbyStores(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm">
          <h2>Nearby Stores</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Latitude:</label>
              <input
                type="text"
                className="form-control"
                // value={latitude}
                value={userLocation[0]}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Longitude:</label>
              <input
                type="text"
                className="form-control"
                // value={longitude}
                value={userLocation[1]}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Get Nearby Stores
            </button>
          </form>
          {nearbyStores.length > 0 && (
            <div className="mt-4">
              <h4>Stores List</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {nearbyStores.map((store) => (
                    <tr key={store._id}>
                      <td>{store.name}</td>
                      <td>{store.location.coordinates[1]}</td>
                      <td>{store.location.coordinates[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}{" "}
        </div>
        <div className="col-sm">
          <div>
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
        </div>
      </div>
    </div>
  );
}

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

export default NearbyStores;
