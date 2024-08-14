import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/">Home</Link>
      <Link to="/discover">Discover</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
}

export default BottomNav;
