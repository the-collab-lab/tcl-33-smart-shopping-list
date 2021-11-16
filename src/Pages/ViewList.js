import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import { db } from '../lib/firebase';
import estimatedTime from '../lib/estimate';

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

  const handleChange = (doc) => {
    if (expired(doc)) {
      checkItem(doc);
    }
  };

  const expired = (doc) => {
    if (doc.data().lastPurchased === null) return true;

    const checkedTime = doc.data().lastPurchased.toDate();
    let expireTime = checkedTime;

    //console.log(estimatedTime(doc));

    expireTime.setDate(checkedTime.getDate() + 1);
    return expireTime < new Date();
  };

  if (!loading && list.docs.length === 0) {
    return <EmptyListPrompt />;
  } else {
    return (
      <>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
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
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
};

export default ViewList;
