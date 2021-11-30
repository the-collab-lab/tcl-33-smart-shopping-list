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
            <NavLink
              to="/AddItem"
              activeStyle={{
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              <div className="navbar-item-add">
                <FontAwesomeIcon icon={faPlus} size="lg" />
                <span className="tooltiptext">Add an Item</span>
              </div>
            </NavLink>

            <NavLink
              activeClassName="is-active"
              to="/ViewList"
              activeStyle={{
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              <div className="navbar-item-view">
                <FontAwesomeIcon icon={faListAlt} size="lg" />
                <span className="tooltiptext">View Your List</span>
              </div>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
