import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import DeletePrompt from '../components/DeletePrompt';
import { db } from '../lib/firebase';

const ViewList = ({ token, checkItem, checked }) => {
  return (
    <div>
      <h2>Grocery List</h2>
      <List token={token} checkItem={checkItem} checked={checked} />
    </div>
  );
};

const List = ({ token, checkItem }) => {
  const [list, loading, error] = useCollection(db.collection(token));
  const [deleteButton, setDeleteButton] = useState(false);

  const handleChange = (doc) => {
    if (expired(doc)) {
      checkItem(doc);
    }
  };

  const promptDelete = (e) => {
    setDeleteButton(true);
  };

  const expired = (doc) => {
    if (doc.data().lastPurchased === null) return true;

    const checkedTime = doc.data().lastPurchased.toDate();
    let expireTime = checkedTime;

    expireTime.setDate(checkedTime.getDate() + 1);
    return expireTime < new Date();
  };

  if (!loading && list.docs.length === 0) {
    return <EmptyListPrompt />;
  } else {
    return (
      <>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {deleteButton ? <DeletePrompt /> : null}
        {loading && <span>Loading...</span>}
        {list && (
          <ul>
            {list.docs.map((doc) => (
              <li key={doc.id}>
                <input
                  type="checkbox"
                  onChange={() => handleChange(doc)}
                  checked={!expired(doc)}
                  value={doc.id}
                />{' '}
                {JSON.stringify(doc.data().item)}
                <button onClick={promptDelete}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
};

export default ViewList;
