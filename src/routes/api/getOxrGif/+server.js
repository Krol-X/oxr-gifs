import { json } from '@sveltejs/kit';

import { ServiceConfig } from '$lib/config';
import { getOxrCourse } from '$lib/service/OxrCourse/OxrCourse';
import { getGiphyRandom } from '$lib/service/Giphy/GiphyRandom';

import { addDays } from '$lib/utils/datetime';


export async function GET() {
  // todo: api errors check
  const OXR_APP_ID = ServiceConfig.Oxr.APP_ID;
  const GIPHY_API_KEY = ServiceConfig.Giphy.API_KEY;
  
	const todayRubCourse = await getOxrCourse(OXR_APP_ID, null, "rub");
	const yesterdayRubCourse = await getOxrCourse(
    OXR_APP_ID,
    addDays(new Date(), -1),
    "rub"
  );
  
  const resultCond = todayRubCourse > yesterdayRubCourse;
  
  const result = await getGiphyRandom(
    GIPHY_API_KEY,
    resultCond? 'rich': 'broke'
  );
  
  // todo: return image instead of url to giphy
	return json(result.data?.images?.downsized?.url);
}
