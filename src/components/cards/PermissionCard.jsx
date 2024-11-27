import React from 'react';

const PermissionCard = ({ permission, onEdit, onDelete }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-bold mb-2">{permission.name}</h3>
      <p className="text-gray-600">{permission.description}</p>
    </div>
    <div className="mt-4 flex justify-between">
      <button
        className="text-white px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="text-white px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  </div>
);

export default PermissionCard;
