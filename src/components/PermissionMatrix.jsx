import React, { useEffect, useState } from "react";
import axios from "axios";

const PermissionMatrix = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState(["read", "write", "delete"]); // Default permissions

  // Fetch roles from the backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Toggle permission for a role
  const togglePermission = async (roleId, permission) => {
    try {
      const role = roles.find((r) => r._id === roleId);
      const updatedPermissions = role.permissions.includes(permission)
        ? role.permissions.filter((p) => p !== permission)
        : [...role.permissions, permission];

      // Update permissions on the backend
      const response = await axios.put(`/api/roles/${roleId}`, {
        permissions: updatedPermissions,
      });

      // Update local state
      setRoles((prevRoles) =>
        prevRoles.map((r) =>
          r._id === roleId ? { ...r, permissions: response.data.permissions } : r
        )
      );
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <div>
      <h2>Permission Matrix</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Role</th>
            {permissions.map((permission) => (
              <th key={permission}>{permission}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td>{role.name}</td>
              {permissions.map((permission) => (
                <td key={permission}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes(permission)}
                    onChange={() => togglePermission(role._id, permission)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionMatrix;
