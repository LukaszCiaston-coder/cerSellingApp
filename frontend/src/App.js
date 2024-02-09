import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./page/HomePage/HomePage";
import SearchPage from "./page/SearchPage/SearchPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import LoginPage from "./page/LoginPage/LoginPage";
import AddCarPage from "./page/AddCarPage/AddCarPage";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/car/add" element={<AddCarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
