import React from "react";
import { Routes, Route } from "react-router-dom";
import SurveysPage from "./pages/survey/SurveysPage.tsx";
import QuestionsPage from "./pages/question/QuestionsPage.tsx";
import UsersPage from "./pages/user/UsersPage.tsx";
import AssignmentsPage from "./pages/assignment/AssignmentsPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Select a Page</h1>} />
      <Route path="/surveys" element={<SurveysPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/assignments/" element={<AssignmentsPage />} />
      <Route path="/assignments/:id" element={<AssignmentsPage />} />
      {/* RIP optional parameters */}
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
