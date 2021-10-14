import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useHistory } from 'react-router-dom';

function CreateList() {
  const history = useHistory();

  function CreateToken() {
    const Token = getToken(words);
    localStorage.setItem(Token, Token);
  }

  // const handleClick = () => history.push('/NewList');
  // const handleClick = () => CreateToken();

  function handleClick() {
    history.push('/AddItem');
    CreateToken();
  }

  return (
    <div>
      <button onClick={handleClick}>Create Shopping List!</button>

      <p>
        You can also{' '}
        <span>
          <b>join an existing shopping list</b>
        </span>
      </p>
      {/* 
      <form onSubmit={FindList}> */}
      <form>
        <input type="text" required minlength="20" /> <br />
        <button type="submit">Get List</button>
      </form>
    </div>
  );
}

export default CreateList;
