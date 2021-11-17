import React, { useState } from 'react';

function DeletePrompt({ yesDelete, noDelete }) {
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={yesDelete}>Yes</button>
      <button onClick={noDelete}>No</button>
    </div>
  );
}

export default DeletePrompt;
