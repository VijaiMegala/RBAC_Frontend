import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', role: '', password: '', isActive: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.get(`/users/${id}`)
        .then((response) => setUser(response.data))
        .catch(() => setError('Error fetching user data'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/users/${id}`, user);
      } else {
        await API.post('/users', user);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Error saving user');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-[90%] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          {id ? 'Edit User' : 'Add User'}
        </h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              className="w-full px-3 py-2 border rounded"
              value={user.role}
              onChange={handleChange}
              required
            />
          </div>
          {!id && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              className="mr-2"
              checked={user.isActive}
              onChange={handleChange}
            />
            <label htmlFor="isActive" className="text-sm font-bold">Active</label>
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {id ? 'Update User' : 'Create User'}
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
