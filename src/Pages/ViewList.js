import React, { useState, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import { db } from '../lib/firebase';

//  #################### VIEW LIST COMPONENT ###################

const ViewList = ({ token, checkItem }) => {
  const [list, loading, error] = useCollection(db.collection(token));
  const [deleteButton, setDeleteButton] = useState(false);

  const [filterValue, setFilterValue] = useState('');

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
      {deleteButton ? <DeletePrompt /> : null}
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
      <List
        loading={loading}
        error={error}
        docs={filteredDocs}
        handleItemCheck={handleItemCheck}
        isFiltered={!!filterValue}
      />
    </div>
  );
};

const DeletePrompt = () => {
  return (
    <div className="delete">
      <h3>Are you sure you want to delete this item?</h3>
      <button>Yes</button>
      <button>No</button>
    </div>
  );
};

//  ################# LIST COMPONENT ###################

const List = ({
  loading,
  error,
  docs,
  handleItemCheck,
  isFiltered,
  setDeleteButton,
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

  const promptDelete = () => {
    setDeleteButton(true);
  };

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
            <button onClick={promptDelete}>Delete</button>
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
