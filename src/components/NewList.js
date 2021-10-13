import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

const createTokenProvider = () => {
  /* Implementation */

  return {
    getToken,
  };
};

const NewList = () => (
  <div>
    <h1 className="title is-1"> Create a new list </h1>
    <div>{createTokenProvider}</div>
  </div>
);

export default NewList;

//This file is under src/components
