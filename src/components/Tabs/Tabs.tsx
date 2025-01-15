import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Tabs.module.css";

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <NavLink className={styles.tab} to="/surveys">
        Surveys
      </NavLink>
      <NavLink className={styles.tab} to="/questions">
        Questions
      </NavLink>
      <NavLink className={styles.tab} to="/users">
        Users
      </NavLink>
      <NavLink className={styles.tab} to="/assignments">
        Assignments
      </NavLink>
    </div>
  );
};

export default Tabs;
