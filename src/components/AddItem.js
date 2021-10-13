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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item, urgency);
    e.target.reset();
    db.collection('lists').add({
      item,
      urgency,
      lastPurchased: null,
      // getToken()
    });
    console.log('submitted');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Grocery item:</label> <br />
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />{' '}
        <br />
        <div onChange={(e) => setUrgency(parseInt(e.target.value))}>
          <input type="radio" id="Soon" value="7" name="Urgency" />
          <label htmlFor="Soon">Soon</label>
          <input
            htmlFor="Urgency"
            id="Kind of Soon"
            type="radio"
            value="14"
            name="Urgency"
          />
          <label htmlFor="Kind of Soon">Kind of Soon</label>
          <input
            htmlFor="Urgency"
            id="Not Soon"
            type="radio"
            value="30"
            name="Urgency"
          />
          <label htmlFor="Not Soon"> Not Soon</label>
        </div>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
