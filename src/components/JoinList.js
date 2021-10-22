import React from 'react';

function JoinList({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="enter token here"></input>
      <br />
      <button type="submit">Join Shopping List!</button>
    </form>
  );
}

export default JoinList;
