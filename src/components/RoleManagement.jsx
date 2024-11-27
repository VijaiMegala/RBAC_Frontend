import React, { useEffect, useState } from "react";
import { fetchRoles, createRole } from "../api/api";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const response = await fetchRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  };

  const handleAddRole = async () => {
    if (!newRole) return;
    try {
      await createRole({ name: newRole });
      setNewRole("");
      loadRoles();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Role Management</h2>
      <input
        type="text"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        className="p-2 border rounded mb-4"
        placeholder="New Role Name"
      />
      <button
        onClick={handleAddRole}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Add Role
      </button>
      <ul className="mt-4">
        {roles.map((role) => (
          <li key={role.id} className="p-2 border-b">
            {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
