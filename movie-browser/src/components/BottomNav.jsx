import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.css';
import HomeIcon from './HomeIcon.jsx';
import SearchIcon from './SearchIcon.jsx';
import AccountIcon from './AccountIcon.jsx';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/"><HomeIcon /></Link>
      <Link to="/discover"><SearchIcon /></Link>
      <Link to="/account"><AccountIcon /></Link>
    </nav>
  );
}

export default BottomNav;
