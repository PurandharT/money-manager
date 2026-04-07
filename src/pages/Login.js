import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleLogin}>
        <h3 className="auth-title">🔐 Login</h3>

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

        <button className="btn btn-primary auth-btn">Login</button>

        <p className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;