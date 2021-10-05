import React from 'react';
import { db } from '../lib/firebase';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { collection, doc, setDoc } from 'firebase/firestore';

export default function AddItem() {
  // const citiesRef = collection(db, 'cities');
  // setDoc(doc(citiesRef, "NY"), {
  //  name: "Los Angeles", state: "CA", country: "USA",
  //  capital: false, population: 3900000,
  // regions: ["west_coast", "socal"] });

  // Write 1 document
  // db.collection('lists').add({
  //   name: 'Kiwi',
  //   price: 2.00,
  // });

  // Read 1 document
  // let docRef = db.collection('lists').doc('4');
  // docRef.get().then((doc) => console.log(doc.data()));

  const [value, loading, error] = useCollection(db.collection('lists'));

  const renderLists = () => {
    if (!loading) {
      return (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>{JSON.stringify(doc.data())}, </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <h2>Testing 123</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {renderLists()}

      {/* <button onClick={}>Add Item</button> */}
    </div>
  );
}
