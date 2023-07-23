import { json } from '@sveltejs/kit';

import { ServiceConfig } from '$lib/config';
import { getOxrCourse } from '$lib/service/OxrCourse/OxrCourse';
import { getGiphyRandom } from '$lib/service/Giphy/GiphyRandom';

import { addDays, dateToday, dateYesterday } from '$lib/utils/datetime';

export async function GET({ params }) {
  const ServerError = json({ status: 500 });

  const currency = params.currency ?? "rub";
  // todo: api errors check
  const OXR_APP_ID = ServiceConfig.Oxr.APP_ID;
  const GIPHY_API_KEY = ServiceConfig.Giphy.API_KEY;

	const todayCourse = await getOxrCourse(OXR_APP_ID, currency);
  if (!todayCourse?.course)
    return ServerError;
	const yesterdayCourse = await getOxrCourse(
    OXR_APP_ID, currency, dateYesterday()
  );
  if (!yesterdayCourse?.course)
    return ServerError;
  const gifTagCond = todayCourse.course > yesterdayCourse.course;

  const giphyResult = await getGiphyRandom(
    GIPHY_API_KEY,
    gifTagCond? 'rich': 'broke'
  ).catch(err => {
    return null;
  });
  if (!giphyResult)
    return ServerError;

  // todo: return image instead of url to giphy (CORS?)
  return json({
    course1: todayCourse,
    course2: yesterdayCourse,
    gifurl: giphyResult?.data?.images?.downsized?.url
  });
}
