import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import RoleCard from '../cards/RoleCard';
import DeleteModal from '../modal/DeleteModal';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/roles')
      .then((response) => setRoles(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (roleId) => {
    setSelectedRoleId(roleId);
    setIsModalOpen(true); // Open the modal on delete
  };

  const confirmDelete = () => {
    if (selectedRoleId) {
      API.delete(`/roles/${selectedRoleId}`)
        .then(() => {
          setRoles(roles.filter((role) => role._id !== selectedRoleId));
          setIsModalOpen(false); // Close modal after successful delete
        })
        .catch((error) => console.error('Error deleting role:', error));
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close modal without performing deletion
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex bg-blue-100 w-full justify-between items-center py-4 px-6">
        <h2 className="text-xl font-bold">Roles</h2>
        <button
          className="text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => navigate('/roles/add')}
        >
          Add Role
        </button>
      </div>
      <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {roles.map((role) => (
          <RoleCard
            key={role._id}
            role={role}
            onEdit={() => navigate(`/roles/${role._id}/edit`)}
            onDelete={() => handleDelete(role._id)} // Trigger modal on delete
          />
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName="role"
      />
    </div>
  );
};

export default RoleList;
