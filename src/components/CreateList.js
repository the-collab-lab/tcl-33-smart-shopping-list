import React from 'react';

function CreateList({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Create Shopping List!</button>
    </form>
  );
}

export default CreateList;
