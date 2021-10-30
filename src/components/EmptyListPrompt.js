import React from 'react';
import { Link } from 'react-router-dom';

function EmptyListPrompt() {
  return (
    <div>
      <h3>Your list is currently empty...</h3>
      <Link to="/AddItem">Add Item</Link>
    </div>
  );
}

export default EmptyListPrompt;
