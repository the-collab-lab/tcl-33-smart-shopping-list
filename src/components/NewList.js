import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

function createTokenProvider() {
  /* Implementation */
  document.querySelector('p').innerText = getToken(words);
}

function NewList() {
  return (
    <div>
      <button onClick={createTokenProvider}>Click me!</button>
      <p></p>
    </div>
  );
}

export default NewList;
