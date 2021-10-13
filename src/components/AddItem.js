import React, { useState } from 'react';
import { db } from '../lib/firebase';
import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';

export default function AddItem() {
  const [item, setItem] = useState('');
  const [urgency, setUrgency] = useState(0);
  const [userToken, setToken] = useState(getToken());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item, urgency);
    e.target.reset();
    db.collection('lists').add({
      item,
      urgency,
      lastPurchased: null,
      userToken,
      // getToken()
    });
    console.log('submitted');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">
          <b>Grocery item:</b>
        </label>{' '}
        <br />
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />{' '}
        <br />
        <br />
        <fieldset onChange={(e) => setUrgency(parseInt(e.target.value))}>
          <legend>
            <b>How soon will you buy this again?</b>
          </legend>

          <input type="radio" id="soon" value="7" name="urgency" />
          <label htmlFor="soon">Soon</label>
          <br />

          <input type="radio" id="kind-of-soon" value="14" name="urgency" />
          <label htmlFor="kind-of-soon"> Kind of soon</label>
          <br />

          <input type="radio" id="not-soon" value="30" name="urgency" />
          <label htmlFor="not-soon"> Not soon</label>
          <br />
        </fieldset>
        <input type="submit" value="Add item" />
      </form>
    </div>
  );
}
