import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import { db } from '../lib/firebase';

const ViewList = ({ token, handleChange, checked }) => {
  return (
    <div>
      <h2>Grocery List</h2>
      <List token={token} handleChange={handleChange} checked={checked} />
    </div>
  );
};

const List = ({ token, handleChange, checked }) => {
  const [list, loading, error] = useCollection(db.collection(token));

  const timeElapsed = (doc) => {
    const checkedTime = doc.data().lastPurchased.toDate();
    // to return the date number(1-31) for the specified date
    console.log('checkedTime => ', checkedTime);
    let tomorrow = new Date();
    tomorrow.setDate(checkedTime.getDate() + 0.0000001);
    //returns the tomorrow date
    console.log('tomorrow => ', tomorrow);

    return tomorrow > checkedTime;
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
                  onChange={handleChange}
                  checked={timeElapsed(doc)}
                  value={doc.id}
                />{' '}
                {console.log(
                  '24 hours has passed: ',
                  doc.data().lastPurchased.toDate() < new Date(),
                )}
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
