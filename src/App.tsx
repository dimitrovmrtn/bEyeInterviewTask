import React from "react";
import "./App.css";
import Header from "./components/Header/Header.tsx";
import Tabs from "./components/Tabs/Tabs.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Tabs />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
