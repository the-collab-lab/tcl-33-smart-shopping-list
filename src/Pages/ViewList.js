import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ViewList = () => {
  const [value, loading, error] = useCollection(db.collection('lists'));

  return (
    <div>
      <h2>Grocery List</h2>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <ul>
          <b>Collection: </b>
          {value.docs.map((doc) => (
            <li key={doc.id}>{JSON.stringify(doc.data().item)} </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewList;
