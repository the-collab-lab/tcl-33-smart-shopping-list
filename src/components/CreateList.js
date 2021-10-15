import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useHistory } from 'react-router-dom';

function CreateList() {
  const history = useHistory();

  function createToken() {
    const token = getToken(words);
    localStorage.setItem('Token', token);
  }

  function handleClick() {
    createToken();
    history.push('/ViewList');
  }

  return (
    <div>
      <button onClick={handleClick}>Create Shopping List!</button>
    </div>
  );
}

export default CreateList;
