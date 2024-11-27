import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const RolePermissions = ({ roleId }) => {
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchRoleAndPermissions = async () => {
      try {
        const roleResponse = await API.get(`/roles/${roleId}`);
        const permissionsResponse = await API.get('/permissions');
        setRole(roleResponse.data);
        setPermissions(permissionsResponse.data);
      } catch (error) {
        console.error('Error fetching role or permissions:', error);
      }
    };

    fetchRoleAndPermissions();
  }, [roleId]);

  const handlePermissionToggle = async (permissionId) => {
    const updatedPermissions = role.permissions.includes(permissionId)
      ? role.permissions.filter(id => id !== permissionId)
      : [...role.permissions, permissionId];

    try {
      const updatedRole = await API.put(`/roles/${roleId}`, { ...role, permissions: updatedPermissions });
      setRole(updatedRole.data);
    } catch (error) {
      console.error('Error updating role permissions:', error);
    }
  };

  if (!role) return <p>Loading role details...</p>;

  return (
    <div>
      <h3>Role: {role.name}</h3>
      <h4>Manage Permissions:</h4>
      {permissions.map(permission => (
        <div key={permission._id}>
          <label>
            <input
              type="checkbox"
              checked={role.permissions.includes(permission._id)}
              onChange={() => handlePermissionToggle(permission._id)}
            />
            {permission.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RolePermissions;
