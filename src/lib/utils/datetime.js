export const addDays = (date, days) => {
  const result = new Date(date.valueOf());
  result.setDate(result.getDate() + days);
  return result;
}
