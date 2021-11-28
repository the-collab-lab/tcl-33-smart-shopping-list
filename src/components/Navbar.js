import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faListAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ token }) => {
  return (
    <nav>
      <div className="navbar-items">
        {!token ? (
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/"
            activeStyle={{
              fontWeight: 'bold',
              color: 'blue',
            }}
          >
            <span>Home</span>
          </NavLink>
        ) : (
          <>
            <div className="navbar-item-add">
              <NavLink
                to="/AddItem"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'blue',
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  className="tooltiptext"
                />
              </NavLink>
            </div>

            <div className="navbar-item-view">
              <NavLink
                activeClassName="is-active"
                to="/ViewList"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'blue',
                }}
              >
                <FontAwesomeIcon
                  icon={faListAlt}
                  size="lg"
                  className="tooltiptext"
                />
              </NavLink>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
