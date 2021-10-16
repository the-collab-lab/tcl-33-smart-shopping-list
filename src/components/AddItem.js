import React, { useState } from 'react';
import { db } from '../lib/firebase';

export default function AddItem({ token }) {
  const [item, setItem] = useState('');
  const [urgency, setUrgency] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item, urgency);
    e.target.reset();
    db.collection(token || 'lists').add({
      item,
      urgency,
      lastPurchased: null,
    });
    setItem(''); // resets input field after submission
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
          required={true}
          onChange={(e) => setItem(e.target.value)}
        />{' '}
        <br />
        <br />
        {/* This fieldset is similar to what we wad going on with the div, just better for accessibility */}
        <fieldset onChange={(e) => setUrgency(parseInt(e.target.value))}>
          <legend>
            <b>How soon will you buy this again?</b>
          </legend>

          <input
            type="radio"
            id="soon"
            value="7"
            name="urgency"
            checked={urgency === 7}
          />
          <label htmlFor="soon">Soon</label>
          <br />

          <input
            type="radio"
            id="kind-of-soon"
            value="14"
            name="urgency"
            checked={urgency === 14}
          />
          <label htmlFor="kind-of-soon"> Kind of soon</label>
          <br />

          <input
            type="radio"
            id="not-soon"
            value="30"
            name="urgency"
            checked={urgency === 30}
          />
          <label htmlFor="not-soon"> Not soon</label>
          <br />
        </fieldset>
        <input type="submit" value="Add item" />
      </form>
    </div>
  );
}
