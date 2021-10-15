import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

function CreateTokens() {
  const Tokens = getToken(words);
  //return

  //<div> <h1 className="title is-1">Token Token Token</h1></div>;

  return <div>{Tokens}</div>;
}

export default CreateTokens;
