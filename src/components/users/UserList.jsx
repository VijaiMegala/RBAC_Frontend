import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import UserCard from '../cards/UserCard';
import DeleteModal from '../modal/DeleteModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteClick = (userId) => {
    // Set the userId to be deleted and open the modal
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUserId) {
      try {
        // Perform the delete operation
        await API.delete(`/users/${selectedUserId}`);
        // Update the users list after deletion
        setUsers(users.filter((user) => user._id !== selectedUserId));
        setIsModalOpen(false); // Close the modal after successful deletion
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Error deleting user');
        setIsModalOpen(false); // Close the modal if an error occurs
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close modal without performing any action
  };

  return (
    <div>
      <div className='flex bg-blue-100 w-screen justify-between items-center py-4 px-4'>
        <h2 className='font-bold'>User Management</h2>
        <button
          className='text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'
          onClick={() => navigate('/users/add')}
        >
          Add User
        </button>
      </div>

      <div className='flex flex-wrap gap-4 p-4'>
        {users.map((user) => (
          <div key={user._id} className='w-full lg:w-1/3'>
            <UserCard
              name={user.name}
              mail={user.email}
              status={user.isActive ? 'Active' : 'Inactive'}
              onEdit={() => navigate(`/users/${user._id}/edit`)}
              onDelete={() => handleDeleteClick(user._id)} // Open the modal
            />
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName="user"
      />
    </div>
  );
};

export default UserList;
