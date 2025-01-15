import React from "react";
import { FaCircleUser, FaUserLock } from "react-icons/fa6";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
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
