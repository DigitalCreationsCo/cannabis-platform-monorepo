import type { NextApiRequest, NextApiResponse } from 'next';
import { recordMetric } from '@/lib/metrics';
import { axios } from '@cd/core-lib';
import * as cheerio from 'cheerio';
import env from '@/lib/env';
import { Event } from '@cd/data-access';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        await handleGET(req, res);
        break;
      case 'PUT':
        await handlePUT(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, PUT');
        res.status(405).json({
          error: { message: `Method ${method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({ error: { message } });
  }
}

// Get cannabis events
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { location = 'ny--new-york', query = 'cannabis' } = req.query;

  const clientToken = req.headers.authorization?.split(' ')[1];
  const token = env.nextAuth.secret;

  if (clientToken !== token) {
    throw new Error('Unauthorized');
  }

  // get cannabis events via cheerio from eventbrite platform

  const response = await axios(
    `https://www.eventbrite.com/d/${location}/${query}/`
  );
  if (response.status !== 200)
    return res
      .status(500)
      .json({ error: { message: 'Failed to fetch events' } });

  const $ = cheerio.load(response.data);
  let events: Event[] = [];

  // $(".elementor-element-7a85e3a8")
  // .find(".e-container")
  // .each((index, element) => {
  //     // extracting the data of interest
  //     const pageUrl = $(element).attr("href")
  //     const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src")
  //     const name = $(element).find(".elementor-image-box-content .elementor-image-box-title").text()

  //     // filtering out not interesting data
  //     if (name && pageUrl) {
  //         // converting the data extracted into a more
  //         // readable object
  //         const industry = {
  //             url: pageUrl,
  //             image: image,
  //             name: name
  //         }

  //         // adding the object containing the scraped data
  //         // to the industries array
  //         industries.push(industry)
  //     }
  // })

  $('script').each((index, element) => {
    const scriptContent = $(element).html();
    if (scriptContent?.includes('window.__SERVER_DATA__')) {
      const regex = /window\.__SERVER_DATA__\s*=\s*(\{.*?\});/;
      const match = scriptContent.match(regex);
      if (match && match[1]) {
        console.info('result ', JSON.parse(match[1])['search_data']['events']);

        events = JSON.parse(match[1])['search_data']['events']['results'];
      }
    }
  });

  recordMetric('event.fetched');

  res.status(200).json({ data: events });
};

// save events from eventbrite search
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { location = 'ny--new-york', query = 'cannabis' } = req.query;

  const clientToken = req.headers.authorization?.split(' ')[1];
  const token = env.nextAuth.secret;

  if (clientToken !== token) {
    throw new Error('Unauthorized');
  }

  // get cannabis events via cheerio from eventbrite platform

  const response = await axios(
    `https://www.eventbrite.com/d/${location}/${query}/`
  );
  if (response.status !== 200)
    return res
      .status(500)
      .json({ error: { message: 'Failed to fetch events' } });

  const $ = cheerio.load(response.data);
  let events: Event[] = [];

  // $(".elementor-element-7a85e3a8")
  // .find(".e-container")
  // .each((index, element) => {
  //     // extracting the data of interest
  //     const pageUrl = $(element).attr("href")
  //     const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src")
  //     const name = $(element).find(".elementor-image-box-content .elementor-image-box-title").text()

  //     // filtering out not interesting data
  //     if (name && pageUrl) {
  //         // converting the data extracted into a more
  //         // readable object
  //         const industry = {
  //             url: pageUrl,
  //             image: image,
  //             name: name
  //         }

  //         // adding the object containing the scraped data
  //         // to the industries array
  //         industries.push(industry)
  //     }
  // })

  $('script').each((index, element) => {
    const scriptContent = $(element).html();
    if (scriptContent?.includes('window.__SERVER_DATA__')) {
      const regex = /window\.__SERVER_DATA__\s*=\s*(\{.*?\});/;
      const match = scriptContent.match(regex);
      if (match && match[1]) {
        console.info('result ', JSON.parse(match[1])['search_data']['events']);

        events = JSON.parse(match[1])['search_data']['events']['results'];
      }
    }
  });

  recordMetric('event.fetched');

  res.status(200).json({ data: events });
};
