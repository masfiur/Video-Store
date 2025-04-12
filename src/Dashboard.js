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

    if (!isAuthenticated || !userEmail) {
      history.push("/login");
      return;
    }

    console.log("Fetching profile for:", userEmail);

    fetch(`https://movieapi-fal9.onrender.com/api/users/profile?email=${userEmail}`, {
      credentials: "include"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setError(""); // clear error if any
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Could not load your profile information");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [history]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userEmail");

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
                    <p><strong>Account Created:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
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
