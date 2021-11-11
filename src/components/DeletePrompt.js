import React from 'react';

function DeletePrompt({}) {
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button>Yes</button>
      <button>No</button>
    </div>
  );
}

export default DeletePrompt;
