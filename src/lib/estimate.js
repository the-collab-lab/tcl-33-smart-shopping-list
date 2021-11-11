import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

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
  const lastPurchasedDate = data.lastPurchased.toDate();
  const wholeDay = 24 * 60 * 60 * 1000;
  const daysSinceLastTransaction = Math.round(
    (new Date() - lastPurchasedDate) / wholeDay,
  );
  const daysUntilNextPurchase = calculateEstimate(
    data.urgency,
    daysSinceLastTransaction,
    data.timesPurchased,
  );

  // At this point, lastPurchasedDate was converted to nextPurchaseDate
  lastPurchasedDate.setDate(
    lastPurchasedDate.getDate() + daysUntilNextPurchase,
  );

  return lastPurchasedDate;
};

export default estimatedTime;
