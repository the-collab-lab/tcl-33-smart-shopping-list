import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useHistory } from 'react-router-dom';

function CreateList() {
  const history = useHistory();

  function CreateToken() {
    const Token = getToken(words);
    localStorage.setItem(Token, Token);
  }

  function handleClick() {
    history.push('/ViewList');
    CreateToken();
  }

  //onSubmit will require conditional to search for input token and take user to populated list view
  function onSubmit() {
    history.push('/ViewList');
  }

  return (
    <div>
<<<<<<< HEAD
      <button onClick={handleClick}>Create Shopping List </button>
=======
      <button onClick={handleClick}>Create Shopping List!</button>
      <p>
        {/*can make make "join an existing shopping list" clickable to open up the form*/}
        You can also{' '}
        <span>
          <b>join an existing shopping list</b>
        </span>
      </p>

      <form onSubmit={onSubmit}>
        <input type="text" required minlength="10" /> <br />
        <button type="submit">Get List</button>
      </form>
>>>>>>> 96c3c54974e970313f33d69613942048c5dc2f70
    </div>
  );
}

export default CreateList;
