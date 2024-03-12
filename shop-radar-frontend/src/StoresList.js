import React, { useState, useEffect } from "react";

const StoresList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchAllStores();
  }, []);

  const fetchAllStores = async () => {
    try {
      const response = await fetch("http://localhost:3002/stores");
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>All Available Stores:</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>{store.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoresList;
