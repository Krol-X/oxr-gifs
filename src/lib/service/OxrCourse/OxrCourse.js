const OXR_API = 'https://openexchangerates.org/api';

import { createUrl } from '$lib/utils/url';

export const getOxrCourse = async (appId, currency, date) => {
  if (!(date instanceof Date)) {
    return await getOxrCourse(appId, currency, new Date());
  }
  const year = date.getFullYear();
  const month = date.toLocaleDateString("en-US", {month: '2-digit'})
  const day = date.toLocaleDateString("en-US", {day: '2-digit'})
  const url = `${OXR_API}/historical/${year}-${month}-${day}.json`;
  
  const data = await fetch(createUrl(url, {
    'app_id': appId
  })).then(resp => {
    // resp.status
    return resp.json()
  });
  const result = {
    currency: currency,
    course: currency? data["rates"][currency.toUpperCase()]: data
  };
  return result
}
