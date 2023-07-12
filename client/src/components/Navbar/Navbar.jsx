import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { removeToken } from "../auth/auth";

export default function Navbar() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("/user/profile");
      setRole(resp.data.userProfile.user_role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    removeToken();
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__title">
          <Link to="/home" className="link">
            <h1 className="navbar__page-title">
              Photo<span>Share</span>
            </h1>
          </Link>
        </div>
        <div className="navbar__list">
          <ul>
            <Link to="/admin" className="link">
              {role === 1 ? <li>Admin</li> : ""}
            </Link>
            <Link to="/profile" className="link">
              <li>My profile</li>
            </Link>
            <Link to="/upload" className="link">
              <li>Upload</li>
            </Link>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
