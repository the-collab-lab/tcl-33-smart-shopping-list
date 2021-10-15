// //This is for NewList.js for  Pages
import React from 'react';
// import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import CreateTokens from '../components/CreateTokens';
import AddItem from './AddItem';

const NewList = () => (
  <div>
    <form>
      <input></input>
      <button type="submit">Add Item </button>
    </form>

    <CreateTokens />
  </div>
);

export default NewList;
