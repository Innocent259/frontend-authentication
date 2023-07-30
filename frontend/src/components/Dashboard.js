import React from "react";

const Dashboard = () => {
 
  return (
    <div className="dashboard">
      <h1>Welcome to My Dashboard</h1>
      <nav>
        <ul className="links">
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
