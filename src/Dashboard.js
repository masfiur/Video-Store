import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const userEmail = sessionStorage.getItem("userEmail");
    const authToken = sessionStorage.getItem("authToken");

    if (!isAuthenticated || !userEmail) {
      history.push("/login");
      return;
    }

    console.log("Fetching profile for:", userEmail);
    
    const headers = {
      "Content-Type": "application/json"
    };
    
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    fetch(`https://movieapi-fal9.onrender.com/api/users/profile?email=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: headers,
      credentials: "include"
    })
      .then(async (response) => {
        const text = await response.text();
        console.log("Profile response:", text);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        
        try {
          return text ? JSON.parse(text) : null;
        } catch (e) {
          console.error("Error parsing profile response:", e);
          return { email: userEmail, createdAt: new Date().toISOString() };
        }
      })
      .then((data) => {
        if (!data) {
          setUser({ email: userEmail, createdAt: new Date().toISOString() });
        } else {
          setUser(data);
        }
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setUser({ email: userEmail, createdAt: new Date().toISOString() });
        setError(null); 
      })
      .finally(() => {
        setLoading(false);
      });

  }, [history]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("authToken");

    history.push("/");
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">User Dashboard</h3>
            </div>
            <div className="card-body">
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <>
                  <h4>Welcome, {user?.email}</h4>
                  <hr />
                  <div className="mb-3">
                    <h5>Your Information</h5>
                    <p><strong>Email:</strong> {user?.email}</p>
                    {user?.createdAt && (
                      <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;