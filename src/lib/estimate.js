import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import React, { useState, useEffect } from 'react';
// const calculateEstimate = (
//   urgency,
//   daysSinceLastTransaction,
//   timesPurchased,
// ) => {
//   //if timesPurchased is equal to one and less than two days, return daysSinceLastTransaction
//   if (timesPurchased < 2) return daysSinceLastTransaction;
//   //what if it's greater than 2?
// };

const estimatedTime = (doc) => {
  const data = doc.data();
  if (data.timeBought) {
    const lastPurchasedDate = new Date() - data.timeBought.toDate();
    const wholeDay = 24 * 60 * 60 * 1000;
    /*    const daysSinceLastTransaction = Math.round(
        (new Date() - lastPurchasedDate) / wholeDay,
      );
  */

    //if else function for daysSinceLastTransaction

    if (lastPurchasedDate > wholeDay) {
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
    const timesPurchased = data.timesPurchased + 1;

    //urgency

    const daysUntilNextPurchase = calculateEstimate(
      data.urgency,
      this.daysSinceLastTransaction,
      data.timesPurchased,
    );
  }

  //console.log(daysUntilNextPurchase)

  // At this point, lastPurchasedDate was converted to nextPurchaseDate
  /*   lastPurchasedDate.setDate(
       lastPurchasedDate.getDate() + daysUntilNextPurchase,
     );

       return lastPurchasedDate;

    
   */
};
export default estimatedTime;
