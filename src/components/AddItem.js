import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function AddItem() {
  // const citiesRef = collection(db, 'cities');
  // setDoc(doc(citiesRef, "NY"), {
  //  name: "Los Angeles", state: "CA", country: "USA",
  //  capital: false, population: 3900000,
  // regions: ["west_coast", "socal"] });

  // Read 1 document
  // let docRef = db.collection('lists').doc('4');
  // docRef.get().then((doc) => console.log(doc.data()));

  const [value, loading, error] = useCollection(db.collection('lists'));
  const [inputs, setInputs] = useState({
    name: 'siila',
    price: 0,
  });

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

  const writeToStore = (e) => {
    db.collection('lists').add({
      name: inputs.name,
      price: inputs.price,
    });
  };

  return (
    <div>
      <h2>Testing 123</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {renderLists()}
    </div>
  );
}
