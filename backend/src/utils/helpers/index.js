export const monthNameToNumber = (month) => {
  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  const index = months.indexOf(month);
  return index !== -1 ? index : null;
};