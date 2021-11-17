import calculateEstimate from '@the-collab-lab/shopping-list-utils';
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
  if (data.timeBought) {
    const timeBetweenPurchases = new Date() - data.timeBought.toDate();
    const wholeDay = 24 * 60 * 60 * 1000;
    /*    const daysSinceLastTransaction = Math.round(
        (new Date() - lastPurchasedDate) / wholeDay,
      );
  */

    //if else function for daysSinceLastTransaction

    if (timeBetweenPurchases > wholeDay) {
      //days In Between the time bought
      let daysSinceLastTransaction;

      if (data.lastTimePurchased) {
        daysSinceLastTransaction = Math.round(
          (data.timeBought.toDate() - data.lastTimePurchased.toDate()) /
            wholeDay,
        );
      } else {
        daysSinceLastTransaction = 1;
      }
    }
    //timesPurchased??
    //const timesPurchased = data.timesPurchased + 1;

    //urgency

    const daysUntilNextPurchase = calculateEstimate(
      data.urgency,
      this.daysSinceLastTransaction,
      data.timesPurchased,
    );

    //daysuntilnextpurchase
    //when is the next date of purchase?
    //timestampObj.toMillis().toString()

    const nextDateOfPurchase =
      daysUntilNextPurchase * wholeDay +
      firebase.firestore.Timestamp.fromMillis(data.timeBought.toMillis());

    // const checkItem = (doc) => {
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

    //};
    //console.log(nextDateOfPurchase);
  }

  //console.log(daysUntilNextPurchase)

  // At this point, lastPurchasedDate was converted to nextPurchaseDate
  /*   lastPurchasedDate.setDate(
       lastPurchasedDate.getDate() + daysUntilNextPurchase,
     );

       return lastPurchasedDate;

    
   */

  // I think we should rename this function to something more specific
};
export default estimatedTime;
