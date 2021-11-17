import React, { useState } from 'react';

function DeletePrompt({ yesDeleteButton, noDeleteButton }) {
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={yesDeleteButton}>Yes</button>
      <button onClick={noDeleteButton}>No</button>
    </div>
  );
}

export default DeletePrompt;
