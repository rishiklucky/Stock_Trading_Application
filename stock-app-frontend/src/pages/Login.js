import React, { useState } from "react";
import "../styles/Login.css";
import { loginUser } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // Optional: store user info locally
      localStorage.setItem("user", JSON.stringify(data));

      setMessage("Login Successful ✅");
      setError("");
      // console.log(data);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage("");
      setError(err.message);
      
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to MRU Trading</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

         {/* 👇 Register Link */}
        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </p>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
