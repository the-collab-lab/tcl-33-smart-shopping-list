import React from 'react';
import { db } from '../lib/firebase';
// import firebase from 'firebase/app';
import 'firebase/firestore';

import { collection, doc, setDoc } from 'firebase/firestore';

export default async function AddItem() {
  const somethingRef = collection(db, 'something');

  await setDoc(doc(somethingRef, 'SF'), {
    name: 'San Francisco',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 860000,
    regions: ['west_coast', 'norcal'],
  });
  // await setDoc(doc(citiesRef, "LA"), {
  //     name: "Los Angeles", state: "CA", country: "USA",
  //     capital: false, population: 3900000,
  //     regions: ["west_coast", "socal"] });
  // await setDoc(doc(citiesRef, "DC"), {
  //     name: "Washington, D.C.", state: null, country: "USA",
  //     capital: true, population: 680000,
  //     regions: ["east_coast"] });
  // await setDoc(doc(citiesRef, "TOK"), {
  //     name: "Tokyo", state: null, country: "Japan",
  //     capital: true, population: 9000000,
  //     regions: ["kanto", "honshu"] });
  // await setDoc(doc(citiesRef, "BJ"), {
  //     name: "Beijing", state: null, country: "China",
  //     capital: true, population: 21500000,
  //     regions: ["jingjinji", "hebei"] });

  return (
    <div>
      <h2>Testing 123</h2>
    </div>
  );
}
