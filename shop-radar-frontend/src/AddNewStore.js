import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewStore({ history }) {
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreLatitude, setNewStoreLatitude] = useState("");
  const [newStoreLongitude, setNewStoreLongitude] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        console.error("Failed to create store");
      }
      navigate("/nearby");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Store</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Store Name:</label>
          <input
            type="text"
            className="form-control"
            value={newStoreName}
            onChange={(e) => setNewStoreName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="text"
            className="form-control"
            value={newStoreLatitude}
            onChange={(e) => setNewStoreLatitude(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="text"
            className="form-control"
            value={newStoreLongitude}
            onChange={(e) => setNewStoreLongitude(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Store
        </button>
      </form>
    </div>
  );
}

export default AddNewStore;
