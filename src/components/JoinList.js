import React, { useState } from 'react';
import { db } from '../lib/firebase';
import ErrorMessage from './ErrorMessage';

function JoinList({ onSharedToken }) {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage(
          'Something unexpected happened. Try refreshing the page.',
        );
      });
  };

  const setTokenHandler = (e) => {
    e.preventDefault();
    setToken(e.target.value);
    e.target.setCustomValidity('');
  };

  return (
    <>
      <p>
        You can also <span>join an existing shopping list.</span>
      </p>

      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="share-token">Share Token</label>
        <br />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <input
          onChange={setTokenHandler}
          id="share-token"
          type="text"
          value={token}
          placeholder="enter token here"
          required
          onInvalid={(e) => {
            e.target.setCustomValidity(
              'error msg:  Please enter a valid token',
            );
          }}
        ></input>
        <br />
        <button type="submit">Join Shopping List!</button>
      </form>
    </>
  );
}

export default JoinList;
