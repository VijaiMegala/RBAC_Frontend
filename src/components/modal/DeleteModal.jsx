import React from 'react';

const DeleteModal = ({ isOpen, onConfirm, onCancel, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
        <p className="mb-6">Do you really want to delete this {itemName}? This action cannot be undone.</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-4"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
