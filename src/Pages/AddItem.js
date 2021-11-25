import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import ErrorMessage from '../components/ErrorMessage';
import estimatedTime from '../lib/estimate';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

export default function AddItem({ token }) {
  const [list, loading, error] = useCollection(db.collection(token));
  const [errorMessage, setErrorMessage] = useState('');
  const [item, setItem] = useState('');
  const [urgency, setUrgency] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateNewListItem(item, list)) {
      db.collection(token).add({
        item,
        urgency,
        lastPurchased: null,
        timesPurchased: 0,
      });
      setUrgency(7);
      setItem('');
    } else {
      setErrorMessage('Item already exists');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">
          <b>Grocery item:</b>
        </label>{' '}
        <br />
        {errorMessage && <ErrorMessage message={errorMessage} />}
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
            readOnly
            checked={urgency === 7}
          />
          <label htmlFor="soon">Soon</label>
          <br />

          <input
            type="radio"
            id="kind-of-soon"
            value="14"
            name="urgency"
            readOnly
            checked={urgency === 14}
          />
          <label htmlFor="kind-of-soon"> Kind of soon</label>
          <br />

          <input
            type="radio"
            id="not-soon"
            value="30"
            name="urgency"
            readOnly
            checked={urgency === 30}
          />
          <label htmlFor="not-soon"> Not soon</label>
          <br />
        </fieldset>
        <input
          css={{
            backgroundColor: 'palegoldenrod',
            fontSize: 20,
            borderRadius: 50,
            borderColor: 'black',
            padding: 10,
            borderWidth: 3,
            color: 'black',
          }}
          type="submit"
          value="Add Item"
        />
      </form>
    </div>
  );
}
const validateNewListItem = (listItem, list) => {
  const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  const duplicateItem = list.docs.find((duplicate) => {
    const existingItem = duplicate
      .data()
      .item.toLowerCase()
      .replace(punctuation, '');

    const newItem = listItem.toLowerCase().replace(punctuation, '');
    console.log(newItem);

    return existingItem === newItem;
  });

  return !duplicateItem;
};
