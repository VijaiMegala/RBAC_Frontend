const mockUsers = [
    { _id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin', isActive: true },
    { _id: '2', name: 'Bob', email: 'bob@example.com', role: 'User', isActive: false },
  ];
  
  const mockRoles = [
    { _id: '1', name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { _id: '2', name: 'User', permissions: ['Read'] },
  ];
  
  export const mockApi = {
    get: (url) => {
      if (url.includes('/users')) return Promise.resolve({ data: mockUsers });
      if (url.includes('/roles')) return Promise.resolve({ data: mockRoles });
      return Promise.reject('Not found');
    },
  };
  