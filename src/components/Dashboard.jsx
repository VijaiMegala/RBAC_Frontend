import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div className="grid grid-cols-2 gap-6">
      <Link
        to="/users"
        className="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Manage Users
      </Link>
      <Link
        to="/roles"
        className="p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Manage Roles
      </Link>
    </div>
  </div>
);

export default Dashboard;
