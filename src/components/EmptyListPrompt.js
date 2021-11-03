import React from 'react';
import { Link } from 'react-router-dom';

function EmptyListPrompt() {
  return (
    <div className="prompt">
      <h3>Your list is currently empty...</h3>
      <Link className="button" to="/AddItem">
        Add Item
      </Link>
    </div>
  );
}

export default EmptyListPrompt;
