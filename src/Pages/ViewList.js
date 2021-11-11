import React, { useState, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  const [list, loading, error] = useCollection(db.collection(token));

  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilterValue(e.target.value);
  };

  const filteredItems = useMemo(() => {
    if (loading || error || !list) {
      return [];
    }

    const items = list.docs.map((doc) => doc.data().item);

    return items.filter((item) => {
      if (!filterValue) {
        return true;
      }

      return item.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [list, loading, error, filterValue]);

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

      <List loading={loading} error={error} items={filteredItems} />
    </div>
  );
};

const List = ({ loading, error, items }) => {
  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  }

  if (loading) {
    return <span>Collection: Loading...</span>;
  }

  if (items) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item} style={{ listStyleType: 'none' }}>
            {item}{' '}
          </li>
        ))}
      </ul>
    );
  }
};

export default ViewList;
