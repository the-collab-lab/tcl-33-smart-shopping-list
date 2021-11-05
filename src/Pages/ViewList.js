import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

import { doc, onSnapshot } from 'firebase/firestore';

// import { doc, onSnapshot } from 'firebase/firestore';

const ViewList = ({ token }) => {
  // if (token === null) token = 'default';

  const [list, loading, error] = useCollection(db.collection(token));

  /* ********************************   */

  let arrString = ['fruit', 'vegetables', 'water', 'legumes'];

  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log('Use Effect ');
    if (value === '') {
      setResults([]);
      return;
    }
    const matches = list.docs.map((doc) => console.log(doc.data().item));
    console.log(matches);
    setResults(matches);
  }, [value]);

  const handleChange = (e) => {
    console.log('handle change fired');
    setValue(e.target.value);
  };
  /* ******************************************* */

  return (
    <div>
      <h2>Grocery List</h2>

      {/* FILTER LIST RENDERING */}
      <div>
        <p>Items = {results}</p>
        <form action="#">
          <label htmlFor="filter-list" style={{ display: 'hidden' }}>
            Filter List
          </label>
          <br />
          <input
            type="search"
            id="filter-list"
            value={value}
            onChange={handleChange}
            placeholder="Enter your item"
          />
        </form>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {list && !value ? (
        <ul>
          <b>Collection: </b>
          {list.docs.map((doc) => (
            <li key={doc.id} style={{ listStyleType: 'none' }}>
              {JSON.stringify(doc.data().item)}{' '}
            </li>
          ))}
        </ul>
      ) : (
        console.log('there is a value')
      )}
    </div>
  );
};

export default ViewList;
