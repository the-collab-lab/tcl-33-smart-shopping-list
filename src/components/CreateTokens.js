import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

function CreateTokens() {
  const Tokens = getToken(words);

  return <div>{Tokens}</div>;
}

export default CreateTokens;
