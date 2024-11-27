import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const PermissionForm = () => {
  const { id } = useParams(); // Get permissionId from URL if editing
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (id) {
      // Fetch the permission details if editing
      API.get(`/permissions/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('Error fetching permission:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update existing permission
      await API.put(`/permissions/${id}`, formData);
    } else {
      // Create new permission
      await API.post('/permissions', formData);
    }
    navigate('/permissions'); // Redirect to permissions list after submitting
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {id ? 'Edit Permission' : 'Create Permission'}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Permission Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter permission name"
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Permission Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter permission description"
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors duration-300"
          >
            {id ? 'Update' : 'Create'} Permission
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PermissionForm;
      