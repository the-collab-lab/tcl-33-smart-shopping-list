import React, { useState } from 'react';
import { db } from '../lib/firebase';

function JoinList({ onSharedToken, setErrorMessage }) {
  const [token, setToken] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    db.collection(token)
      .get()
      .then((resp) => {
        if (resp.size) {
          onSharedToken(token);
        } else {
          setErrorMessage('Invalid Token');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setTokenHandler = (e) => {
    e.preventDefault();
    setToken(e.target.value);
    e.target.setCustomValidity('');
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="share-token">Share Token</label>
      <br />
      <input
        onChange={setTokenHandler}
        id="share-token"
        type="text"
        value={token}
        placeholder="enter token here"
        required
        onInvalid={(e) => {
          e.target.setCustomValidity("Field can't be blank. Try again.");
        }}
      ></input>
      <br />
      <button type="submit">Join Shopping List!</button>
    </form>
  );
}

export default JoinList;
