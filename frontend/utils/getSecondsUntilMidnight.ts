// export const getSecondsUntilMidnight = (): number => {
//   const now = new Date();
//   const midnight = new Date(now);
//   midnight.setHours(24, 0, 0, 0); // Set to next midnight
//   return Math.floor((midnight.getTime() - now.getTime()) / 1000); // Return full integer value
// };

export const getMillisecondsUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); // Set to next midnight
  return midnight.getTime() - now.getTime(); // Return milliseconds
};
