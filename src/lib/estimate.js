const calculateEstimate = (
  urgency,
  daysSinceLastTransaction,
  timesPurchased,
) => {
  //if timesPurchased is equal to one and less than two days, return daysSinceLastTransaction
  if (timesPurchased < 2) return daysSinceLastTransaction;
  //what if it's greater than 2?
};

export default calculateEstimate;
