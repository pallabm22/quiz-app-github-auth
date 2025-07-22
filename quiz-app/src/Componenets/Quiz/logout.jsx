// src/components/logout.js
import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    // Optionally clear localStorage or other client-side state
    window.location.href = "http://localhost:5173/";
  };

  return (
    <button className="logout-button" onClick={handleLogout} style={{ marginLeft: "10px" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
