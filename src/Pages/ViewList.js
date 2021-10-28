import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  if (token === null) token = 'default';

  const [list, loading, error] = useCollection(db.collection(token));

  return (
    <div>
      <h2>Grocery List</h2>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {list && (
        <ul>
          <b>Collection: </b>
          {list.docs.map((doc) => (
            <li key={doc.id}>{JSON.stringify(doc.data().item)} </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewList;
