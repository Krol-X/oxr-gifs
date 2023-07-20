const GIPHY_RANDOM_API = 'https://api.giphy.com/v1/gifs/random';

import { createUrl } from '$lib/utils/url';

export const getGiphyRandom = async (apiKey, tag, rating) => {
  const url = createUrl(GIPHY_RANDOM_API, {
    'api_key': apiKey,
    'tag': tag ?? '',
    'rating': rating ?? 'g'
  });
  
  const result = await fetch(url).then(resp => {
    // resp.status
    return resp.json()
  });
  return result
}
