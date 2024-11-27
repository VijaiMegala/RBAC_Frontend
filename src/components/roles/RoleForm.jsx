import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const RoleForm = () => {
  const { id } = useParams(); // Get the roleId from the URL
  const [formData, setFormData] = useState({ name: '', permissions: [] });
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch role data if id exists
    if (id) {
      API.get(`/roles/${id}`).then((response) => {
        const roleData = response.data;
        setFormData({
          name: roleData.name,
          permissions: roleData.permissions.map((permission) => permission._id), // Extract only permission IDs
        });
      });
    }

    // Fetch available permissions for the checkboxes
    API.get('/permissions').then((response) => {
      setAvailablePermissions(response.data);
    });
  }, [id]);

  const handlePermissionToggle = (permissionId) => {
    const updatedPermissions = formData.permissions.includes(permissionId)
      ? formData.permissions.filter((id) => id !== permissionId)
      : [...formData.permissions, permissionId];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const permissionNames = formData.permissions
      .map((permissionId) => {
        const permission = availablePermissions.find((p) => p._id === permissionId);
        return permission ? permission.name : null;
      })
      .filter((name) => name !== null);
    const updatedFormData = { ...formData, permissions: permissionNames };

    if (id) {
      await API.put(`/roles/${id}`, updatedFormData);
    } else {
      await API.post('/roles', updatedFormData);
    }
    handleBack();
  };

  const handleBack = () => {
    navigate(-1); // -1 takes the user to the previous page in history
  };

  return (
    <div className="flex items-center justify-center h-[90%]">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          {id ? 'Edit Role' : 'Add Role'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="roleName">
              Role Name:
            </label>
            <input
              type="text"
              id="roleName"
              className="w-full px-3 py-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter role name"
              required
            />
          </div>
          <h4 className="mb-4 text-lg font-semibold">Assign Permissions</h4>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            {availablePermissions.map((permission) => (
              <label key={permission._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission._id)}
                  onChange={() => handlePermissionToggle(permission._id)}
                />
                <span>
                  {permission.name} -{' '}
                  <span className="text-gray-500">{permission.description}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              type="submit"
            >
              {id ? 'Update Role' : 'Create Role'}
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              type="button"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
