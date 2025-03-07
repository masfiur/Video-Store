import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      alert("Logged in successfully!");
    }
  };

  return (
    <>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-sm" style={{width: '400px'}}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Log In</h2>
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
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="d-grid">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Log In
                </button>
              </div>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don't have an account? <a href="#" className="text-primary">Sign Up</a>
              </small>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;