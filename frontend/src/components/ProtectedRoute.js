import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-user",
          { withCredentials: true }
        );
        let success = response.data.success;
        if (success) {
          setUser(response.data.user);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="protectedRoute">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {/* Render the Outlet with the context */}
      <Outlet context={user} />
    </>
  );
};

export default ProtectedRoute;
