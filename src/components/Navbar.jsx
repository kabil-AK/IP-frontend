import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = async () => {
   
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand asset-regular " to="/">IP APPLICATION</Link>
        <div>
          {!token && (
            <>
              <Link className="btn btn-outline-primary me-2  " to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          )}
          {token && <button className="btn btn-danger" onClick={logout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}
