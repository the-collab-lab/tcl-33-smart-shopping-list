import React from 'react';
import { render } from 'react-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import EmptyListPrompt from '../components/EmptyListPrompt';
import { db } from '../lib/firebase';

const ViewList = ({ token }) => {
  // if (token === null) token = 'default';

  const [list, loading, error] = useCollection(db.collection(token));

  const renderList = () => {
    if (list.docs.length === 0) {
      return <EmptyListPrompt />;
    } else {
      return (
        <>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
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

  return (
    <div>
      <h2>Grocery List</h2>

      {loading ? <span>Collection: Loading...</span> : renderList()}
    </div>
  );
};

export default ViewList;
