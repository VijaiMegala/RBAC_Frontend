import React from 'react';

const RoleCard = ({ role, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-semibold">{role.name}</h3>
        <p className="text-sm text-gray-600">ID: {role._id}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="text-white px-4 py-1 bg-blue-600 rounded hover:bg-blue-700"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="text-white px-4 py-1 bg-red-600 rounded hover:bg-red-700"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RoleCard;
