import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Attempting login with:", email);
      
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("https://movieapi-fal9.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include",
      });

      console.log("Response status:", response.status);
      
      const responseText = await response.text();
      console.log("Response body:", responseText);
      
      let result;
      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch (e) {
        console.error("Error parsing JSON:", e);
        result = responseText;
      }

      if (!response.ok) {
        throw new Error(`Login failed with status: ${response.status}`);
      }

      if (result === true || 
          (typeof result === "object" && (result.success === true || result.authenticated === true)) ||
          responseText === "true") {
        
        console.log("Login successful");
        
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userEmail", email);
        
        if (typeof result === "object" && result.token) {
          sessionStorage.setItem("authToken", result.token);
        }
        
        history.push("/Dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Log In</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="/forgot-password" className="text-primary">Forgot password?</a>
                </div>
              </div>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : "Log In"}
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account? <a href="/register" className="text-primary">Sign Up</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;