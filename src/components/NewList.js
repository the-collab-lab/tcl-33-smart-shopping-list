import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useHistory } from 'react-router-dom';

function NewList() {
  function createTokenProvider() {
    /* Implementation */
    document.querySelector('p').innerText = getToken(words);
    console.log(getToken(words));
  }

  const history = useHistory();
  const handleClick = () => history.push('./NewList');

  return (
    <div>
      <button onClick={handleClick}>Create a New Shopping List!</button>
      <p>{createTokenProvider}</p>
    </div>
  );
}

export default NewList;
