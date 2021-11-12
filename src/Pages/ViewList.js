import React, { useState, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import DeletePrompt from '../components/DeletePrompt';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { doc } from 'prettier';

//  #################### VIEW LIST COMPONENT ###################

const ViewList = ({ token, checkItem }) => {
  const [list, loading, error] = useCollection(db.collection(token));
  const [deleteButton, setDeleteButton] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const deleteItemPrompt = (e) => {
    setDeleteButton(true);
  };

  //working on retrieving item value
  const confirmDelete = (doc) => {
    console.log(doc);
    db.collection(token)
      .doc(doc.id)
      .update({
        item: list.doc.data().FieldValue.delete(),
      })
      .then(() => {
        console.log('Successfully deleted!');
      });
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilterValue(e.target.value);
  };

  const filteredDocs = useMemo(() => {
    if (loading || error || !list) {
      return [];
    }

    return list.docs.filter((doc) => {
      if (!filterValue) {
        return true;
      }

      return doc.data().item.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [list, loading, error, filterValue]);

  const handleItemCheck = (doc) => {
    if (isExpired(doc)) {
      checkItem(doc);
    }
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
      {deleteButton ? <DeletePrompt confirmDelete={confirmDelete} /> : null}
      <List
        loading={loading}
        error={error}
        docs={filteredDocs}
        handleItemCheck={handleItemCheck}
        isFiltered={!!filterValue}
        deleteItemPrompt={deleteItemPrompt}
      />
    </div>
  );
};

const List = ({
  loading,
  error,
  docs,
  handleItemCheck,
  isFiltered,
  deleteItemPrompt,
}) => {
  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  }

  if (loading) {
    return <span>Collection: Loading...</span>;
  }

  if (!isFiltered && docs.length === 0) {
    return <EmptyListPrompt />;
  }

  if (docs) {
    return (
      <ul>
        {docs.map((doc) => (
          <li key={doc.id} style={{ listStyleType: 'none' }}>
            <input
              type="checkbox"
              onChange={() => handleItemCheck(doc)}
              checked={!isExpired(doc)}
              value={doc.id}
            />{' '}
            {doc.data().item}
            <button onClick={deleteItemPrompt}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
};

// ################### IS-EXPIRED FUNCTION ##################

const isExpired = (doc) => {
  if (doc.data().lastPurchased === null) return true;

  const checkedTime = doc.data().lastPurchased.toDate();
  let expireTime = checkedTime;

  expireTime.setDate(checkedTime.getDate() + 1);
  return expireTime < new Date();
};

export default ViewList;
