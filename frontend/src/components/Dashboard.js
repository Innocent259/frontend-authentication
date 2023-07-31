import React from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";


const Dashboard = () => {
  const outlet = useOutletContext()
  const navigate = useNavigate()
 const handleLogout = async() => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/logout', {withCredentials: true})
    let success = response.data.success
      if(success) {
        navigate('/login')
      }
  }
  catch(err) {
    console.log(err)
  }
 }
  return (
    <div className="dashboard">
      <h1>Welcome back {outlet.userName}</h1>
      <nav>
        <ul className="links">
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
