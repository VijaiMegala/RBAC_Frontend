import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import PermissionCard from '../cards/PermissionCard';
import DeleteModal from '../modal/DeleteModal';

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedPermissionId, setSelectedPermissionId] = useState(null); // Selected permission for deletion
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/permissions')
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (permissionId) => {
    setSelectedPermissionId(permissionId);
    setIsModalOpen(true); // Open modal when delete is triggered
  };

  const confirmDelete = () => {
    if (selectedPermissionId) {
      API.delete(`/permissions/${selectedPermissionId}`)
        .then(() => {
          setPermissions(permissions.filter((permission) => permission._id !== selectedPermissionId));
          setIsModalOpen(false); // Close modal after successful delete
        })
        .catch((error) => console.error('Error deleting permission:', error));
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close modal without performing deletion
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex bg-blue-100 w-full justify-between items-center py-4 px-6">
        <h2 className="text-xl font-bold">Permissions</h2>
        <button
          className="text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => navigate('/permissions/add')}
        >
          Add Permission
        </button>
      </div>
      <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {permissions.map((permission) => (
          <PermissionCard
            key={permission._id}
            permission={permission}
            onEdit={() => navigate(`/permissions/${permission._id}/edit`)}
            onDelete={() => handleDelete(permission._id)} // Trigger modal on delete
          />
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName="permission"
      />
    </div>
  );
};

export default PermissionList;
