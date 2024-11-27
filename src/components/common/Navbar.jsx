import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between">
      <div>
        <Link className="text-white mr-4" to="/">Users</Link>
        <Link className="text-white mr-4" to="/roles">Roles</Link>
        <Link className="text-white" to="/permissions">Permissions</Link>
      </div>
      {user ? (
        <button onClick={logout} className="text-white">Logout</button>
      ) : (
        <Link className="text-white" to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
