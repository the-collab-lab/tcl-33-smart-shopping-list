import React from 'react';

function DeletePrompt({ yesDelete }) {
  // console.log(yesDelete);
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={yesDelete}>Yes</button>
      <button>No</button>
    </div>
  );
}

export default DeletePrompt;
