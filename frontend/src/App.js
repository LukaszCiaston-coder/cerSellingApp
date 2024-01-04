// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./page/HomePage/HomePage";
import SearchPage from "./page/SearchPage/SearchPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import LoginPage from "./page/LoginPage/LoginPage";
import AddCarPage from "./page/AddCarPage/AddCarPage";
import UserProfilePage from "./page/UserProfilePage/UserProfilePage";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/register"
          element={<RegisterPage onRegister={handleLogin} />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {user && (
          <>
            <Route path="/add" element={<AddCarPage />} />
            <Route
              path="/profile"
              element={<UserProfilePage user={user} onLogout={handleLogout} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
