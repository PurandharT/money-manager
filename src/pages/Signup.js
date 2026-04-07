import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Account Created ✅");
    navigate("/");
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleSignup}>
        <h3 className="auth-title">📝 Signup</h3>

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-success auth-btn">Create Account</button>

        <p className="auth-link">
          Already have an account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;