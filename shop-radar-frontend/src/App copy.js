import React, { useState, useEffect } from "react";
import "./App.css";
import StoresList from "./StoresList";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreLatitude, setNewStoreLatitude] = useState("");
  const [newStoreLongitude, setNewStoreLongitude] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/stores?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchStores();
  };

  const handleCreateStore = async () => {
    try {
      const response = await fetch("http://localhost:3002/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newStoreName,
          latitude: newStoreLatitude,
          longitude: newStoreLongitude,
        }),
      });

      if (response.ok) {
        setNewStoreName("");
        setNewStoreLatitude("");
        setNewStoreLongitude("");
        fetchStores();
      } else {
        console.error("Failed to create store");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Store Locator</h1>
      <div>
        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search Stores</button>

      <h2>Stores within 3 miles:</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>{store.name}</li>
        ))}
      </ul>

      <h2>Create a new store:</h2>
      <div>
        <label>Store Name:</label>
        <input
          type="text"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
        />
      </div>
      <div>
        <label>Store Latitude:</label>
        <input
          type="text"
          value={newStoreLatitude}
          onChange={(e) => setNewStoreLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Store Longitude:</label>
        <input
          type="text"
          value={newStoreLongitude}
          onChange={(e) => setNewStoreLongitude(e.target.value)}
        />
      </div>
      <button onClick={handleCreateStore}>Create Store</button>
      <StoresList />
    </div>
  );
}

export default App;
