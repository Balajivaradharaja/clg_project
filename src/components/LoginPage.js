
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { email: "admin@example.com", password: "admin123", role: "Admin" },
  { email: "user@example.com", password: "user123", role: "User" },
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "User") {
        navigate("/");
      } else {
        alert("Only 'User' role can access this dashboard.");
      }
    } else {
      setError("Invalid credentials or account doesn't exist.");
      navigate("/register");
    }
  };

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;


