import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
      <p>Role: {user.roles.name}</p>
    </div>
  );
};

export default UserDetails;
