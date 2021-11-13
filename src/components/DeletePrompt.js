import React from 'react';

function DeletePrompt({ confirmDelete }) {
  console.log(confirmDelete);
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={confirmDelete}>Yes</button>
      <button>No</button>
    </div>
  );
}

export default DeletePrompt;
