export const addDays = (date, days) => {
  const result = new Date(date.valueOf());
  result.setDate(result.getDate() + days);
  return result;
}

export const dateToday = () => (new Date());
export const dateYesterday = () => (addDays(new Date(), -1));
export const dateTommorow = () => (addDays(new Date(), 1));
