import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import UserList from './components/users/UserList';
import RoleList from './components/roles/RoleList';
import PermissionList from './components/permisssions/PermissionList';

import UserForm from './components/users/UserForm';
import Login from './components/Login';
import RoleForm from './components/roles/RoleForm';
import PermissionForm from './components/permisssions/PermissionForm';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/users/add" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/roles" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
          <Route path="/roles/add" element={<RoleForm />} />
          <Route path="/roles/:id/edit" element={<RoleForm />} />
          <Route path="/permissions" element={<ProtectedRoute><PermissionList /></ProtectedRoute>} />
          <Route path="/permissions/add" element={<PermissionForm />} />
          <Route path="/permissions/:id/edit" element={<PermissionForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
