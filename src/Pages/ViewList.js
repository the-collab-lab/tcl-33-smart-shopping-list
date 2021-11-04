import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import FilterList from '../components/FilterList';

import { doc, onSnapshot } from 'firebase/firestore';

const ViewList = ({ token }) => {
  // if (token === null) token = 'default';

  const [list, loading, error] = useCollection(db.collection(token));

  return (
    <div>
      <h2>Grocery List</h2>

      <FilterList />
      {/* need conditional that filters through document.data.item and matches them to const regex = /input.value/gmi
      const filteredDocs = {list.docs.filter((doc.data().item) => ( doc.data().item.match(regex))
            <li key={doc.id}>{JSON.stringify(doc.data().item)} </li>
          ))}
          */}

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
