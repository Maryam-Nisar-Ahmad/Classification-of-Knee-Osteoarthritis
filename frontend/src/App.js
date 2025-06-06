import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import XrayUploader from "./components/XrayUploader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProgressDashboard from "./components/ProgressDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode"; // ✅ correct

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ email: decoded.email });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Router>
      <AppNavbar user={user} setUser={setUser} />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<><XrayUploader user={user} /><ProgressDashboard /></>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
