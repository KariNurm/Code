import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <header className="navBar">
      <Link className="navLink" to="/">
        Home
      </Link>
      <Link className="navLink" to="/search">
        Search
      </Link>
      <Link className="navLink" to="/categories">
        Categories
      </Link>
      <Link className="navLink" to="/random">
        Hungry!
      </Link>
    </header>
  );
}

export default Header;
