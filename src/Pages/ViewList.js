import { doc } from 'prettier';
import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  // if (token === null) token = 'default';

  const [list, loading, error] = useCollection(db.collection(token));

  const [inputValue, setInputValue] = useState('');

  // const filteredItems = list.docs.filter(doc => doc.data().item.includes(inputValue))

  const handleChange = (e) => {
    console.log('handle change fired');
    setInputValue(e.target.value);
  };
  /* ******************************************* */

  return (
    <div>
      <h2>Grocery List</h2>

      {/* FILTER LIST RENDERING */}
      <div>
        <form action="#">
          <label htmlFor="filter-list" style={{ display: 'hidden' }}>
            Filter List
          </label>
          <br />
          <input
            type="search"
            id="filter-list"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter your item"
          />
        </form>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {list && inputValue ? (
        <ul>
          {/* list.docs.filter(docs => docs.data().item.includes(inputValue).map(filteredItem => )) */}
          {list.docs.map((doc) => (
            <li key={doc.id} style={{ listStyleType: 'none' }}>
              {JSON.stringify(doc.item)}
              {console.log(inputValue)}
              {/* {JSON.stringify(filteredItems)} */}
              {console.log(JSON.stringify(doc.data().item))}{' '}
            </li>
          ))}
        </ul>
      ) : (
        console.log('there is no inputValue')
      )}
    </div>
  );
};

export default ViewList;
