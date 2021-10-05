import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">{/* ... */}</div>

      <div className={`navbar-menu ${isOpen && 'is-active'}`}>
        <div className="navbar-start">
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/AddItem"
          >
            Add Item
          </NavLink>

          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/ViewList"
          >
            View List
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
