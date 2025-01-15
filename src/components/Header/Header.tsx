import React from "react";
import "./Header.css";
import { FaCircleUser, FaUserLock } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="header">
      <div>
        {" "}
        <FaCircleUser /> bEye Client
      </div>
      <input
        type="text"
        placeholder="Type your search query, but don't expect results..."
      />
      <button>
        <FaUserLock /> Sign Out
      </button>
    </div>
  );
};

export default Header;
