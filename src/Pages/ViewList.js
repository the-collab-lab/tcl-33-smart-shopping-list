import React, { useState, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import DeletePrompt from '../components/DeletePrompt';
import { db } from '../lib/firebase';
import { doc } from 'prettier';

//  #################### VIEW LIST COMPONENT ###################

const ViewList = ({ token, checkItem }) => {
  const [list, loading, error] = useCollection(db.collection(token));
  const [deleteButton, setDeleteButton] = useState(false);
  const [yesButton, setYesButton] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  // const deleteItemPrompt = (doc) => {
  //   console.log(doc.id)
  //   setDeleteButton(true);

  // };

  const confirmDelete = (doc) => {
    console.log(doc.id);
    setDeleteButton(true);

    if (yesDelete) {
      db.collection(token)
        .doc(doc.id)
        .delete()
        .then(() => {
          console.log(doc.id + 'Successfully deleted!');
        })

        .catch((error) => {
          console.error('removing document: ' + error);
        });
    } else {
      console.log('nope');
    }
  };

  const yesDelete = (e) => {
    setYesButton(true);
    console.log(e);
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

      <List
        deleteButton={deleteButton}
        loading={loading}
        error={error}
        docs={filteredDocs}
        handleItemCheck={handleItemCheck}
        isFiltered={!!filterValue}
        yesDelete={yesDelete}
        // deleteItemPrompt={deleteItemPrompt}
        confirmDelete={confirmDelete}
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
  // deleteItemPrompt,
  deleteButton,
  yesDelete,
  confirmDelete,
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
      <div>
        {deleteButton ? (
          <DeletePrompt confirmDelete={confirmDelete} yesDelete={yesDelete} />
        ) : null}
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
              <button onClick={() => confirmDelete(doc)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
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
