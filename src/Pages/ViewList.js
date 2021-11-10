import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  const [list, loading, error] = useCollection(db.collection(token));

  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilterValue(e.target.value);
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <div>
        <form action="#">
          <label htmlFor="filter-list">Filter List</label>
          <br />
          <input
            type="search"
            id="filter-list"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Enter your item"
          />
        </form>
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {!loading && !error && list && !filterValue && (
        <ul>
          {list.docs.map((doc) => (
            <li key={doc.id} style={{ listStyleType: 'none' }}>
              {doc.data().item}{' '}
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && list && filterValue && (
        <ul>
          {list.docs.map((doc) => (
            <li key={doc.id} style={{ listStyleType: 'none' }}>
              {doc
                .data()
                .item.split(' ')
                .filter((word) =>
                  word.toLowerCase().includes(filterValue.toLowerCase()),
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewList;
