// src/components/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { email, password, role: "User" };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/"); 
  };

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
