import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  return (
    <div>
      <h2>Grocery List</h2>
      <List token={token} />
    </div>
  );
};

const List = ({ token }) => {
  const [list, loading, error] = useCollection(db.collection(token));

  if (!loading && list.docs.length === 0) {
    return <EmptyListPrompt />;
  } else {
    return (
      <>
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
      </>
    );
  }
};

export default ViewList;
