import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import NearbyStores from "./NearbyStores";
import AddNewStore from "./AddNewStore";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
            My Store App
          </NavLink>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/nearby">
                Nearby Stores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add">
                Add New Store
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/nearby" element={<NearbyStores />} />
          <Route path="/add" element={<AddNewStore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
