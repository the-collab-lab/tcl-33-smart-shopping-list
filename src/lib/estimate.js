import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../lib/firebase';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';

// const calculateEstimate = (
//   urgency,
//   daysSinceLastTransaction,
//   timesPurchased,
// ) => {
//   //if timesPurchased is equal to one and less than two days, return daysSinceLastTransaction
//   if (timesPurchased < 2) return daysSinceLastTransaction;
//   //what if it's greater than 2?
// };

/*const [token, setToken] = useState(null);

  // console.log(calculateEstimate(urgency, daysSinceLastTransaction, timesPurchase))

  useEffect(() => {
    const user = localStorage.getItem('Token');
    user && setToken(user);
  }, [token]);
  */

const estimatedTime = (doc, token) => {
  const data = doc.data();
  console.log('data', data);
  if (data.lastPurchased) {
    const timeBetweenPurchases =
      new Date().getTime() - data.lastPurchased.toMillis();
    const wholeDay = 24 * 60 * 60 * 1000;

    //if else function for daysSinceLastTransaction
    let daysSinceLastTransaction = 0;
    if (timeBetweenPurchases > wholeDay) {
      //days In Between the time bought
      daysSinceLastTransaction = Math.round(timeBetweenPurchases / wholeDay);
    }

    const daysUntilNextPurchase = calculateEstimate(
      data.urgency,
      daysSinceLastTransaction,
      data.timesPurchased,
    );

    //getTime in javascript is different from react
    const nextDateOfPurchase = firebase.firestore.Timestamp.fromMillis(
      daysUntilNextPurchase * wholeDay + data.lastPurchased.toMillis(),
    );

    //console.log("nextDateOfPurchase", nextDateOfPurchase)
    //console.log("daysUntilNextPurchase", daysUntilNextPurchase)
    // console.log("wholeDay", wholeDay)
    //console.log("date",data.lastPurchased.toMillis())

    db.collection(token)
      .doc(doc.id)
      .update({
        lastPurchased: new Date(),
        timesPurchased: doc.data().timesPurchased + 1,
        nextDateOfPurchase: nextDateOfPurchase,
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  }
  //added an else if an item is new and doesn't have last purchased
  else {
    db.collection(token)
      .doc(doc.id)
      .update({
        lastPurchased: new Date(),
        timesPurchased: 1,
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  }
};
export default estimatedTime;
