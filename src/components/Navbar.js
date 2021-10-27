import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ token }) => {
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
          {!token && (
            <>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'blue',
                }}
              >
                <span>Home&nbsp;&nbsp;</span>
              </NavLink>
            </>
          )}

          {token && (
            <>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/AddItem"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'blue',
                }}
              >
                <span>Add Item &nbsp;&nbsp;</span>
              </NavLink>

              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/ViewList"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'blue',
                }}
              >
                View List&nbsp;&nbsp;
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
