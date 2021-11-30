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
            
          </NavLink>
        ) : (
          <>
            <div className="navbar-item-add">
              <NavLink
                to="/AddItem"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                <FontAwesomeIcon icon={faPlus} size="lg" />
              </NavLink>
              <span className="tooltiptext">Add an Item</span>
            </div>

            <div className="navbar-item-view">
              <NavLink
                activeClassName="is-active"
                to="/ViewList"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                <FontAwesomeIcon icon={faListAlt} size="lg" />
              </NavLink>

              <span className="tooltiptext">View Your List</span>

            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
