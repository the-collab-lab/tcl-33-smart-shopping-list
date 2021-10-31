import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

export default function AddItem({ token }) {
  const [list, loading, error] = useCollection(db.collection(token));
  console.log(list);
  const [item, setItem] = useState('');
  const [urgency, setUrgency] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateNewListItem(item, list)) {
      db.collection(token).add({
        item,
        urgency,
        lastPurchased: null,
      });
      setUrgency(7);
      setItem('');
    } else {
      console.log('Item already exists');
    }
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
const validateNewListItem = (listItem, list) => {
  const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  const filteredList = list.docs.filter((filteredItem) =>
    console.log(filteredItem.data().item),
  );

  // filteredItem.toLowerCase()
  //                                                            .replace(punctuation, "") ===
  //                                                            listItem.toLowerCase()
  //                                                            .replace(punctuation, ""));

  if (filteredList) {
    console.log('Error');
    return false;
  } else {
    return true;
  }
};
