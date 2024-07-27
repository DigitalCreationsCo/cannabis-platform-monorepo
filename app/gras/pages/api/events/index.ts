import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { CronJobApi, axios } from '@cd/core-lib';
import {
	addToEventJobLocations,
	type Event,
	getActiveEvents,
	getEventJobLocations,
	updateManyEvents,
} from '@cd/data-access';
import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';

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
			// case 'PATCH':
			// 	await handlePATCH(req, res);
			// 	break;
			default:
				// res.setHeader('Allow', 'GET, PUT, PATCH');
				res.setHeader('Allow', 'GET, PUT');
				res.status(405).json({
					error: { message: `Method ${method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;
		console.error('api/events: ', message);
		res.status(status).json({ error: { message } });
	}
}

// Get cannabis events
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { zipcode, radius } = req.query as { zipcode: string; radius: string };
	const clientToken = req.headers.authorization?.split(' ')[1];

	const token = env.nextAuth.secret;

	if (clientToken !== token) {
		throw new Error('Unauthorized');
	}

	console.info('get events: ', { zipcode, radius });
	const events = await getActiveEvents({
		client,
		zipcode,
		radius: Number(radius),
	});

	console.info('events: ', events);
	recordMetric('event.fetched');
	res.status(200).json({ data: events });
};

// save events from eventbrite search
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const {
		location = 'ny--new-york',
		timezone = 'America/New_York',
		query = 'cannabis',
		create_cron = false,
	} = req.query as {
		location: string;
		timezone: string;
		query: string;
		create_cron: string;
	};
	const clientToken = req.headers.authorization?.split(' ')[1];
	const token = env.nextAuth.secret;
	if (clientToken !== token) {
		throw new Error('Unauthorized');
	}
	// get cannabis events from eventbrite platform
	const response = await axios(
		`https://www.eventbrite.com/d/${location}/${query}/`
	);
	console.info('response: ', response);
	if (response.status !== 200) {
		return res
			.status(500)
			.json({ error: { message: 'Failed to fetch events' } });
	}
	const $ = cheerio.load(response.data);
	let events: Event[] = [];
	$('script').each((index, element) => {
		const scriptContent = $(element).html();
		if (scriptContent?.includes('window.__SERVER_DATA__')) {
			const regex = /window\.__SERVER_DATA__\s*=\s*(\{.*?\});/;
			const match = scriptContent.match(regex);
			if (match?.[1]) {
				events = JSON.parse(match[1]).search_data.events.results;
			}
		}
	});
	const { ok, matchedCount, modifiedCount, hasWriteErrors, upsertedCount } =
		await updateManyEvents({ client, data: [...events] });

	if (create_cron) {
		const eventJobLocations = await getEventJobLocations({
			client,
		});
		if (
			!eventJobLocations.find(
				(eventJobLocation) => eventJobLocation.location === location
			)
		) {
			process.env.NODE_ENV === 'production' &&
				(await CronJobApi.createGetEventsByLocationJob(location, timezone));
			await addToEventJobLocations({ client, location });
		}
	}

	res.status(201).json({
		ok,
		matchedCount,
		modifiedCount,
		hasWriteErrors,
		upsertedCount,
	});
};
