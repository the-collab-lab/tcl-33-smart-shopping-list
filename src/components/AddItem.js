import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function AddItem() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    db.collection('lists').add({
      item,
      price,
    });
    console.log('submitted');
  };

  const handleChange = (e) => {
    console.log('changed');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="item">Grocery item:</label> <br />
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />{' '}
        <br />
        <label htmlFor="price">Price:</label> <br />
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{' '}
        <br />
        <input type="submit" value="submit" />
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
      </form>
    </div>
  );
}
