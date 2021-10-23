import React, { useState } from 'react';

function JoinList({ onSharedToken }) {
  const [token, setToken] = useState('');

  return (
    <form onSubmit={(e) => onSharedToken(e, token)}>
      <label htmlFor="share-token">Share Token</label>
      <br />
      <input
        onChange={(e) => setToken(e.target.value)}
        id="share-token"
        type="text"
        value={token}
        placeholder="enter token here"
      ></input>
      <br />
      <button type="submit">Join Shopping List!</button>
    </form>
  );
}

export default JoinList;
