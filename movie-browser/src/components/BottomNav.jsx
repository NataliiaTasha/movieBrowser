import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';
import HomeIcon from './HomeIcon.jsx';
import SearchIcon from './SearchIcon.jsx';
import AccountIcon from './AccountIcon.jsx';

function BottomNav() {
  const location = useLocation(); //get the current path
  return (
    <nav className="bottom-nav">
      <Link to="/">
      <HomeIcon isActive={location.pathname === '/'} />
      </Link>
      <Link to="/discover">
      <SearchIcon isActive={location.pathname === '/discover'} />
      </Link>
      <Link to="/account">
      <AccountIcon  isActive={location.pathname === '/account'}/>
      </Link>
    </nav>
  );
}

export default BottomNav;
