import React from "react";
import "./Tabs.css";
import { NavLink } from "react-router-dom";

const Tabs = () => {
  return (
    <div className="tabs">
      <NavLink className="tab" to="/surveys">
        Surveys
      </NavLink>
      <NavLink className="tab" to="/questions">
        Questions
      </NavLink>
      <NavLink className="tab" to="/users">
        Users
      </NavLink>
      <NavLink className="tab" to="/assignments">
        Assignments
      </NavLink>
    </div>
  );
};

export default Tabs;
