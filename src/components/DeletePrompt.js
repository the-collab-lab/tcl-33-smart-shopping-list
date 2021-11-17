import React, { useState } from 'react';

function DeletePrompt({ yesDelete }) {
  const [deleteButton, setDeleteButton] = useState(false);

  const noDelete = (e) => {
    console.log('no delete');
    setDeleteButton(false);
  };

  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={yesDelete}>Yes</button>
      <button onClick={noDelete}>No</button>
    </div>
  );
}

export default DeletePrompt;
