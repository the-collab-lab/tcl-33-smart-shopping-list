import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function AddItem() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  // Read 1 document
  // let docRef = db.collection('lists').doc('5');
  // docRef.get().then((doc) => console.log(doc.data()));

  const [value, loading, error] = useCollection(db.collection('lists'));
  if (!loading) {
    // console.log(value);
    console.log(error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    db.collection('lists').add({
      item,
      price,
    });
    console.log('submitted');
  };

  return (
    <div>
      <h2>Grocery List</h2>

      <form onSubmit={handleSubmit}>
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
      </form>

      <ul>
        {/* {value.docs.map((doc) => (
          <li key={doc.id}>{JSON.stringify(doc.data())}, </li>
        ))} */}
      </ul>
    </div>
  );
}
