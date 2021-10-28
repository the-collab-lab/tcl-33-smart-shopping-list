import React from 'react';

function CreateList({ onSubmit }) {
  return (
    <>
      <h1 className="title is-1"> Welcome to your smart shopping list </h1>
      <h2 className="title is-1">
        {' '}
        Tap "Create shopping list" to get started.{' '}
      </h2>
      <form onSubmit={onSubmit}>
        <button type="submit">Create Shopping List!</button>
      </form>
    </>
  );
}

export default CreateList;
