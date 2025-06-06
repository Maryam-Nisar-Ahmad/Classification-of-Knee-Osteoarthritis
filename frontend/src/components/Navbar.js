import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppNavbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
      <Container>
        <Navbar.Brand className="fw-bold text-primary">🦵 Knee Health AI</Navbar.Brand>
        <div className="d-flex gap-2">
          {user ? (
            <>
              <span className="me-2 mt-1">👤 {user.email}</span>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-primary" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
